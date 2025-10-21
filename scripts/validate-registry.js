#!/usr/bin/env node

/**
 * validate-registry.js
 *
 * Validates registry.json format and content:
 * - JSON syntax
 * - Root fields
 * - Required fields for each Skill
 * - Format validation (regex, types)
 * - Uniqueness constraints
 * - Category enumeration
 */

const fs = require('fs');
const path = require('path');

// Valid categories
const VALID_CATEGORIES = [
  'genre-knowledge',
  'writing-techniques',
  'quality-assurance',
  'workflow-guide'
];

// Validation results
const results = {
  success: true,
  errors: [],
  newSkills: [] // Will be populated by check-new-skills.js
};

/**
 * Main validation function
 */
function validateRegistry() {
  console.log('🔍 Validating registry.json...\n');

  // 1. Read and parse JSON
  let registry;
  try {
    const registryPath = path.join(process.cwd(), 'registry.json');
    const content = fs.readFileSync(registryPath, 'utf-8');
    registry = JSON.parse(content);
    console.log('✅ JSON syntax valid');
  } catch (error) {
    results.success = false;
    results.errors.push(`Invalid JSON syntax: ${error.message}`);
    saveResults();
    process.exit(1);
  }

  // 2. Validate root fields
  if (!registry.version) {
    results.errors.push('Missing "version" field');
  }

  if (!registry.lastUpdated) {
    results.errors.push('Missing "lastUpdated" field');
  }

  if (!Array.isArray(registry.skills)) {
    results.errors.push('Missing or invalid "skills" array');
    results.success = false;
    saveResults();
    process.exit(1);
  }

  console.log(`✅ Root fields valid (${registry.skills.length} skills)`);

  // 3. Validate each skill
  const seenIds = new Set();
  const seenRepos = new Set();

  registry.skills.forEach((skill, index) => {
    const skillErrors = [];
    const skillPrefix = `Skill #${index + 1}`;

    // Required fields
    if (!skill.id) {
      skillErrors.push('Missing "id"');
    }
    if (!skill.type) {
      skillErrors.push('Missing "type"');
    }
    if (!skill.name) {
      skillErrors.push('Missing "name"');
    }
    if (!skill.description) {
      skillErrors.push('Missing "description"');
    }
    if (!skill.repository) {
      skillErrors.push('Missing "repository"');
    }

    // Format validation
    if (skill.id && !/^[a-z0-9-]+$/.test(skill.id)) {
      skillErrors.push(`Invalid id format "${skill.id}" (must be kebab-case: lowercase, numbers, hyphens only)`);
    }

    if (skill.type && skill.type !== 'skill') {
      skillErrors.push(`Invalid type "${skill.type}" (must be "skill")`);
    }

    if (skill.version && !/^\d+\.\d+\.\d+$/.test(skill.version)) {
      skillErrors.push(`Invalid version format "${skill.version}" (must be semver: MAJOR.MINOR.PATCH)`);
    }

    if (skill.repository && !skill.repository.startsWith('https://github.com/')) {
      skillErrors.push(`Invalid repository URL "${skill.repository}" (must start with "https://github.com/")`);
    }

    if (skill.category && !VALID_CATEGORIES.includes(skill.category)) {
      skillErrors.push(`Invalid category "${skill.category}" (must be one of: ${VALID_CATEGORIES.join(', ')})`);
    }

    if (skill.rating !== undefined && (typeof skill.rating !== 'number' || skill.rating < 0 || skill.rating > 5)) {
      skillErrors.push(`Invalid rating "${skill.rating}" (must be number between 0-5)`);
    }

    if (skill.downloads !== undefined && (typeof skill.downloads !== 'number' || skill.downloads < 0)) {
      skillErrors.push(`Invalid downloads "${skill.downloads}" (must be non-negative number)`);
    }

    // Type validation for arrays
    if (skill.keywords && !Array.isArray(skill.keywords)) {
      skillErrors.push('"keywords" must be an array');
    }

    if (skill.tags && !Array.isArray(skill.tags)) {
      skillErrors.push('"tags" must be an array');
    }

    if (skill.prerequisites && !Array.isArray(skill.prerequisites)) {
      skillErrors.push('"prerequisites" must be an array');
    }

    // Uniqueness checks
    if (skill.id) {
      if (seenIds.has(skill.id)) {
        skillErrors.push(`Duplicate skill id "${skill.id}"`);
      }
      seenIds.add(skill.id);
    }

    if (skill.repository) {
      if (seenRepos.has(skill.repository)) {
        skillErrors.push(`Duplicate repository "${skill.repository}"`);
      }
      seenRepos.add(skill.repository);
    }

    // Add errors with skill prefix
    if (skillErrors.length > 0) {
      const prefix = skill.id ? `${skillPrefix} (${skill.id})` : skillPrefix;
      skillErrors.forEach(error => {
        results.errors.push(`${prefix}: ${error}`);
      });
    }
  });

  // Set success flag
  if (results.errors.length > 0) {
    results.success = false;
  }

  // Print results
  console.log();
  if (results.success) {
    console.log('✅ All validation checks passed!');
  } else {
    console.log(`❌ Validation failed with ${results.errors.length} error(s):\n`);
    results.errors.forEach(error => {
      console.log(`   - ${error}`);
    });
  }

  // Save results
  saveResults();

  // Exit with appropriate code
  process.exit(results.success ? 0 : 1);
}

/**
 * Save validation results to JSON file
 */
function saveResults() {
  const resultsPath = path.join(process.cwd(), 'validation-results.json');
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  console.log(`\n📝 Results saved to validation-results.json`);
}

// Run validation
validateRegistry();
