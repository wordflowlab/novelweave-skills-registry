# Automated Validation

## ADDED Requirements

### Requirement: GitHub Actions Validation Workflow

The registry SHALL implement a GitHub Actions workflow that automatically validates Pull Requests modifying `registry.json`:
- Workflow SHALL trigger on PRs that modify registry.json
- Workflow SHALL run validation scripts
- Workflow SHALL publish results as PR comments
- Workflow SHALL set PR check status based on validation results

#### Scenario: PR triggers validation

- **WHEN** a Pull Request modifies registry.json
- **THEN** GitHub Actions workflow "validate-skill.yml" SHALL be triggered
- **AND** workflow SHALL checkout the PR branch
- **AND** workflow SHALL install dependencies
- **AND** workflow SHALL run validation scripts

#### Scenario: Validation success

- **WHEN** all validation checks pass
- **THEN** PR check status SHALL be set to "success"
- **AND** validation results SHALL be posted as PR comment
- **AND** comment SHALL include "✅ registry.json validation passed"
- **AND** PR SHALL be eligible for merge (subject to branch protection)

#### Scenario: Validation failure

- **WHEN** any validation check fails
- **THEN** PR check status SHALL be set to "failure"
- **AND** validation results SHALL be posted as PR comment
- **AND** comment SHALL list specific errors
- **AND** PR SHALL NOT be eligible for merge until fixed

### Requirement: Registry Format Validation Script

The registry SHALL provide a `scripts/validate-registry.js` script that:
- Validates JSON syntax
- Checks required fields presence
- Validates field formats and types
- Checks uniqueness constraints
- Validates category enumeration
- Outputs results to `validation-results.json`

#### Scenario: JSON syntax validation

- **WHEN** running validate-registry.js
- **THEN** it SHALL attempt to parse registry.json
- **AND** if parsing fails, SHALL report "Invalid JSON syntax"
- **AND** validation SHALL fail immediately

#### Scenario: Required fields check

- **WHEN** running validate-registry.js
- **THEN** for each Skill entry, it SHALL verify:
  - id field exists and is non-empty
  - type field exists and equals "skill"
  - name field exists and is non-empty
  - description field exists and is non-empty
  - repository field exists and is non-empty
- **AND** if any required field is missing, SHALL report error with entry index

#### Scenario: Format validation

- **WHEN** running validate-registry.js
- **THEN** it SHALL validate:
  - id matches regex `^[a-z0-9-]+$`
  - version (if present) matches regex `^\d+\.\d+\.\d+$`
  - repository starts with "https://github.com/"
  - category (if present) is in allowed list
  - rating (if present) is between 0-5
  - downloads (if present) is >= 0
- **AND** report specific format errors for each violation

#### Scenario: Uniqueness validation

- **WHEN** running validate-registry.js
- **THEN** it SHALL collect all Skill IDs
- **AND** collect all repository URLs
- **AND** report "Duplicate skill id" if any ID appears multiple times
- **AND** report "Duplicate repository" if any repository appears multiple times

#### Scenario: Output generation

- **WHEN** validate-registry.js completes
- **THEN** it SHALL write results to `validation-results.json`
- **AND** results SHALL include:
  - success: boolean
  - errors: array of error messages
  - newSkills: array (populated by check-new-skills.js)
- **AND** exit with code 0 if success is true
- **AND** exit with code 1 if success is false

### Requirement: New Skills Detection Script

The registry SHALL provide a `scripts/check-new-skills.js` script that:
- Identifies newly added Skill entries in the PR
- Validates each new Skill's repository accessibility
- Validates each new Skill's SKILL.md file format
- Updates validation-results.json with new Skill details

#### Scenario: Detect new Skills

- **WHEN** running check-new-skills.js
- **THEN** it SHALL execute `git show origin/main:registry.json` to get base registry
- **AND** read current registry.json from PR branch
- **AND** compare Skill IDs between base and current
- **AND** identify Skills present in current but not in base as "new Skills"

#### Scenario: Repository accessibility check

- **WHEN** check-new-skills.js finds new Skills
- **THEN** for each new Skill, it SHALL:
  - Execute `git ls-remote {repository} HEAD`
  - If command succeeds, set repositoryAccessible = true
  - If command fails, set repositoryAccessible = false and record error message

#### Scenario: SKILL.md validation

- **WHEN** repository is accessible
- **THEN** check-new-skills.js SHALL:
  - Construct raw GitHub URL: `{repository}/raw/main/SKILL.md`
  - Execute `curl -sf {url}` to fetch SKILL.md
  - If curl succeeds, verify frontmatter format
  - Check frontmatter contains "name:" and "description:"
  - Set skillMdValid = true if all checks pass
  - Set skillMdError with specific error if any check fails

#### Scenario: Frontmatter format validation

- **WHEN** validating SKILL.md content
- **THEN** it SHALL check for frontmatter delimiters `---`
- **AND** extract content between first pair of `---`
- **AND** verify "name:" field exists in frontmatter
- **AND** verify "description:" field exists in frontmatter
- **AND** report specific error if frontmatter is missing or invalid

#### Scenario: Update validation results

- **WHEN** check-new-skills.js completes
- **THEN** it SHALL read existing validation-results.json
- **AND** add newSkills array with validation details for each new Skill
- **AND** set success = false if any new Skill has repositoryAccessible = false or skillMdValid = false
- **AND** write updated results back to validation-results.json

### Requirement: Validation Results Publishing

The GitHub Actions workflow SHALL publish validation results as a PR comment:
- Comment SHALL be formatted in Markdown
- Comment SHALL include overall status (✅ passed or ❌ failed)
- Comment SHALL list new Skills detected
- Comment SHALL show validation status for each new Skill
- Comment SHALL include next steps guidance

#### Scenario: Success comment format

- **WHEN** validation passes
- **THEN** PR comment SHALL include:
  - "## Skill Validation Results"
  - "✅ **registry.json validation passed**"
  - "### New Skills Detected" section listing each new Skill
  - For each new Skill: "✅ Repository accessible" and "✅ SKILL.md valid"
  - "### Next Steps" with manual review instructions

#### Scenario: Failure comment format

- **WHEN** validation fails
- **THEN** PR comment SHALL include:
  - "## Skill Validation Results"
  - "❌ **Validation failed**"
  - "### Errors" section listing all errors
  - For each new Skill with issues: "❌" markers and specific error messages
  - "### Required Actions" explaining how to fix errors

### Requirement: Branch Protection Integration

The repository SHALL configure branch protection rules for the `main` branch:
- Require pull request before merging
- Require at least 1 approval
- Require status checks to pass before merging
- Required status check: "validate" (from GitHub Actions)

#### Scenario: Prevent merge on validation failure

- **WHEN** PR validation check fails
- **THEN** GitHub SHALL prevent merging the PR
- **AND** "Merge pull request" button SHALL be disabled
- **AND** status SHALL show "Some checks were not successful"

#### Scenario: Allow merge on validation success

- **WHEN** PR validation check passes
- **AND** PR has required approvals
- **THEN** "Merge pull request" button SHALL be enabled
- **AND** PR SHALL be eligible for merge

### Requirement: Validation Performance

The validation workflow SHALL complete within reasonable time limits:
- Total workflow execution SHOULD complete within 3 minutes
- Format validation SHOULD complete within 10 seconds
- Each new Skill validation SHOULD complete within 30 seconds
- Failed validations SHOULD fail fast and report errors early

#### Scenario: Fast failure

- **WHEN** JSON syntax error is detected
- **THEN** validation SHALL fail immediately
- **AND** SHALL NOT proceed to subsequent validation steps
- **AND** SHALL report error within 5 seconds

#### Scenario: Parallel validation

- **WHEN** multiple new Skills are detected
- **THEN** repository accessibility checks MAY run in parallel
- **AND** SKILL.md fetches MAY run concurrently
- **AND** results SHALL be collected and combined
