#!/usr/bin/env node

/**
 * check-new-skills.js
 *
 * Detects and validates newly added Skills in a PR:
 * - Compares current registry with base branch
 * - Identifies new Skill entries
 * - Checks repository accessibility via git ls-remote
 * - Fetches and validates SKILL.md frontmatter
 * - Updates validation-results.json
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Execute shell command and return output
 */
function exec(command) {
  try {
    return execSync(command, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] });
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * Main function
 */
async function checkNewSkills() {
  console.log('\n🔍 Checking for new Skills...\n');

  // 1. Read existing validation results
  const resultsPath = path.join(process.cwd(), 'validation-results.json');
  let results;
  try {
    const content = fs.readFileSync(resultsPath, 'utf-8');
    results = JSON.parse(content);
  } catch (error) {
    console.error('❌ Error reading validation-results.json');
    console.error('   Make sure validate-registry.js ran first');
    process.exit(1);
  }

  // 2. Get base registry from main branch
  let baseRegistry;
  try {
    console.log('📥 Fetching base registry from main branch...');
    const baseContent = exec('git show origin/main:registry.json');
    baseRegistry = JSON.parse(baseContent);
    console.log(`✅ Base registry loaded (${baseRegistry.skills.length} skills)`);
  } catch (error) {
    console.log('⚠️  Could not fetch base registry (likely first commit)');
    baseRegistry = { skills: [] };
  }

  // 3. Read current registry
  const registryPath = path.join(process.cwd(), 'registry.json');
  const currentRegistry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

  // 4. Find new skills
  const baseSkillIds = new Set(baseRegistry.skills.map(s => s.id));
  const newSkills = currentRegistry.skills.filter(s => !baseSkillIds.has(s.id));

  if (newSkills.length === 0) {
    console.log('ℹ️  No new Skills detected');
    saveResults(results);
    process.exit(0);
  }

  console.log(`\n🆕 Found ${newSkills.length} new Skill(s):\n`);

  // 5. Validate each new skill
  for (const skill of newSkills) {
    console.log(`   Checking: ${skill.name} (${skill.id})`);

    const validation = {
      id: skill.id,
      name: skill.name,
      repository: skill.repository,
      repositoryAccessible: false,
      skillMdValid: false,
      repositoryError: null,
      skillMdError: null
    };

    // Check repository accessibility
    try {
      exec(`git ls-remote ${skill.repository} HEAD`);
      validation.repositoryAccessible = true;
      console.log(`      ✅ Repository accessible`);
    } catch (error) {
      validation.repositoryError = `Repository not accessible: ${error.message}`;
      console.log(`      ❌ Repository not accessible`);
      results.success = false;
    }

    // Fetch and validate SKILL.md
    if (validation.repositoryAccessible) {
      try {
        // Construct raw GitHub URL
        const rawUrl = skill.repository
          .replace('github.com', 'raw.githubusercontent.com')
          .replace(/\.git$/, '') + '/main/SKILL.md';

        console.log(`      📄 Fetching SKILL.md...`);
        const skillMdContent = exec(`curl -sf "${rawUrl}"`);

        // Validate frontmatter
        if (!skillMdContent.includes('---')) {
          validation.skillMdError = 'Missing frontmatter delimiters';
          console.log(`      ❌ Missing frontmatter`);
        } else {
          const frontmatterMatch = skillMdContent.match(/^---\n([\s\S]*?)\n---/);
          if (!frontmatterMatch) {
            validation.skillMdError = 'Invalid frontmatter format';
            console.log(`      ❌ Invalid frontmatter format`);
          } else {
            const frontmatter = frontmatterMatch[1];

            // Check required fields
            if (!frontmatter.includes('name:')) {
              validation.skillMdError = 'Missing "name:" field in frontmatter';
              console.log(`      ❌ Missing "name:" field`);
            } else if (!frontmatter.includes('description:')) {
              validation.skillMdError = 'Missing "description:" field in frontmatter';
              console.log(`      ❌ Missing "description:" field`);
            } else {
              validation.skillMdValid = true;
              console.log(`      ✅ SKILL.md valid`);
            }
          }
        }

        if (!validation.skillMdValid) {
          results.success = false;
        }
      } catch (error) {
        validation.skillMdError = `Failed to fetch SKILL.md: ${error.message}`;
        console.log(`      ❌ Failed to fetch SKILL.md`);
        results.success = false;
      }
    }

    results.newSkills.push(validation);
  }

  // 6. Print summary
  console.log('\n📊 Validation Summary:\n');
  results.newSkills.forEach(skill => {
    const status = (skill.repositoryAccessible && skill.skillMdValid) ? '✅' : '❌';
    console.log(`   ${status} ${skill.name} (${skill.id})`);
    if (skill.repositoryError) {
      console.log(`      ❌ ${skill.repositoryError}`);
    }
    if (skill.skillMdError) {
      console.log(`      ❌ ${skill.skillMdError}`);
    }
  });

  // 7. Save updated results
  saveResults(results);

  // 8. Exit with appropriate code
  console.log();
  if (results.success) {
    console.log('✅ All new Skills validated successfully!');
    process.exit(0);
  } else {
    console.log('❌ Some new Skills failed validation');
    process.exit(1);
  }
}

/**
 * Save validation results to JSON file
 */
function saveResults(results) {
  const resultsPath = path.join(process.cwd(), 'validation-results.json');
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  console.log(`\n📝 Results updated in validation-results.json`);
}

// Run check
checkNewSkills().catch(error => {
  console.error('❌ Fatal error:', error.message);
  process.exit(1);
});
