# Community Contribution

## ADDED Requirements

### Requirement: Pull Request Contribution Workflow

The registry SHALL support community contributions through standardized Pull Request workflow:
- Contributors SHALL fork the repository
- Contributors SHALL edit registry.json to add their Skill entry
- Contributors SHALL submit Pull Request with proper title and description
- Pull Request SHALL trigger automated validation
- WordFlow Lab team SHALL review and approve/reject within 3 business days

#### Scenario: Fork and edit

- **WHEN** contributor wants to add a Skill
- **THEN** contributor SHALL fork `wordflowlab/novelweave-skills-registry`
- **AND** clone their fork locally or edit on GitHub
- **AND** edit registry.json to add new Skill entry in the skills array
- **AND** commit changes to a new branch

#### Scenario: Submit Pull Request

- **WHEN** contributor has prepared their Skill entry
- **THEN** contributor SHALL create Pull Request from their fork to main repository
- **AND** use title format: "Add skill: {skill-name}"
- **AND** fill out PR template with:
  - Skill information (name, ID, repository)
  - Description of the Skill's value
  - Target users
  - Contribution checklist
- **AND** submit the PR

#### Scenario: Automated validation triggers

- **WHEN** Pull Request is submitted
- **THEN** GitHub Actions SHALL automatically run validation
- **AND** validation results SHALL be posted as PR comment within 5 minutes
- **AND** contributor SHALL see check status (success/failure)

#### Scenario: Review and approval

- **WHEN** automated validation passes
- **THEN** PR SHALL enter review queue
- **AND** WordFlow Lab team member SHALL review within 3 business days
- **AND** reviewer SHALL check content quality, relevance, and safety
- **AND** reviewer SHALL either approve or request changes

### Requirement: Skill Repository Requirements

Contributors MUST create a valid Skill repository before submitting to registry:
- Repository MUST be public on GitHub
- Repository MUST contain SKILL.md file in the root
- SKILL.md MUST have valid frontmatter with name and description
- Skill MUST be tested and functional

#### Scenario: Repository accessibility

- **WHEN** validation checks new Skill
- **THEN** git ls-remote SHALL successfully access the repository
- **AND** repository SHALL be publicly readable
- **AND** if repository is private or inaccessible, validation SHALL fail

#### Scenario: SKILL.md presence

- **WHEN** validation checks new Skill repository
- **THEN** it SHALL fetch SKILL.md from repository main branch
- **AND** SKILL.md SHALL exist at repository root
- **AND** if SKILL.md is missing, validation SHALL fail with specific error

#### Scenario: SKILL.md format

- **WHEN** validating SKILL.md content
- **THEN** file SHALL start with frontmatter delimiters `---`
- **AND** frontmatter SHALL contain "name:" field
- **AND** frontmatter SHALL contain "description:" field
- **AND** if frontmatter is invalid or missing required fields, validation SHALL fail

### Requirement: Skill Entry Checklist

Before submitting Pull Request, contributors MUST verify the following checklist:
- Skill repository is created and public
- SKILL.md exists and format is correct
- Skill functionality is tested
- Skill ID uses kebab-case format
- Skill ID is unique in registry.json
- Repository URL is correct and accessible
- Description is clear and accurate (10-200 characters)
- Keywords include 3-10 relevant terms
- Version uses semver format
- Verified flag is set to false

#### Scenario: Unique ID requirement

- **WHEN** contributor chooses Skill ID
- **THEN** contributor SHALL search existing registry.json for duplicates
- **AND** SHALL use kebab-case format (lowercase letters, numbers, hyphens only)
- **AND** SHALL ensure ID is descriptive and unique
- **AND** if ID conflicts exist, validation SHALL fail

#### Scenario: Initial verified status

- **WHEN** community contributor adds Skill entry
- **THEN** contributor SHALL set "verified": false
- **AND** SHALL NOT set "verified": true
- **AND** only WordFlow Lab SHALL set verified to true during review

### Requirement: Pull Request Template

The repository SHALL provide a PR template that guides contributors:
- Template SHALL include Skill information section
- Template SHALL include description and rationale section
- Template SHALL include target users section
- Template SHALL include contribution checklist
- Template SHALL prompt for optional screenshots

#### Scenario: PR template rendering

- **WHEN** contributor creates new Pull Request
- **THEN** GitHub SHALL pre-populate PR description with template
- **AND** template SHALL include placeholders:
  - **Skill 名称:**
  - **Skill ID:**
  - **Repository:**
  - ## 描述
  - ## 为什么要添加这个 Skill?
  - ## 目标用户
  - ## 检查清单
- **AND** contributor SHALL fill in all sections

### Requirement: Review Criteria

WordFlow Lab reviewers SHALL evaluate Pull Requests based on:
- Automated validation results (must pass)
- Content quality (accurate, professional, well-structured)
- Relevance (related to novel writing)
- Originality (not duplicate of existing Skills)
- Safety (no malicious content, ads, or inappropriate material)
- Maintainability (author willing to maintain)
- Documentation completeness (clear usage instructions and examples)

#### Scenario: Content quality review

- **WHEN** reviewer evaluates PR
- **THEN** reviewer SHALL verify:
  - Skill content is accurate and professional
  - Structure is clear and well-organized
  - Information is helpful for novel writers
- **AND** if quality is insufficient, request changes with specific feedback

#### Scenario: Relevance check

- **WHEN** reviewer evaluates Skill relevance
- **THEN** Skill content SHALL be related to novel writing
- **AND** Skill SHALL provide practical value to writers
- **AND** if Skill is off-topic, PR SHALL be rejected with explanation

#### Scenario: Safety review

- **WHEN** reviewer checks for safety issues
- **THEN** reviewer SHALL verify:
  - No malicious links or content
  - No advertising or promotional material
  - No inappropriate or offensive content
- **AND** if safety issues found, PR SHALL be rejected immediately

### Requirement: Common Rejection Reasons

The following situations SHALL result in PR rejection:
- Low content quality (unclear descriptions, poor structure, inaccurate information)
- Irrelevant to novel writing (off-topic content)
- Duplicate of existing Skill (high overlap with existing functionality)
- Contains malicious content (ads, malicious links, inappropriate material)
- Repository inaccessible (private or non-existent repository)
- SKILL.md format errors (missing frontmatter or required fields)

#### Scenario: Rejection feedback

- **WHEN** PR is rejected
- **THEN** reviewer SHALL provide specific reason
- **AND** explain what needs to be improved
- **AND** if fixable, suggest how to address issues
- **AND** close PR with constructive feedback
- **AND** contributor MAY submit new PR after addressing issues

### Requirement: Updating Existing Skills

Skill authors SHALL be able to update their published Skills through the following process:
- Author MUST update Skill repository content and SKILL.md version
- Author MUST submit PR to update version and lastUpdated in registry.json
- Author MUST use PR title format: "Update skill: {skill-name} to v{version}"
- Update SHALL go through same validation and review process as new Skills

#### Scenario: Version update PR

- **WHEN** author updates Skill repository to new version
- **THEN** author SHALL submit PR to registry
- **AND** update the Skill entry's "version" field to new version
- **AND** update "lastUpdated" field to current timestamp
- **AND** PR description SHALL explain changes in the new version

### Requirement: Skill Removal

The registry SHALL support Skill removal requests from authors:
- Author MUST submit PR removing Skill entry from registry.json
- Author MUST use PR title format: "Remove skill: {skill-name}"
- Author SHOULD provide reason for removal
- Removal request SHALL be processed within 3 business days

#### Scenario: Author-requested removal

- **WHEN** Skill author wants to remove their Skill
- **THEN** author SHALL fork registry and remove Skill entry
- **AND** submit PR with removal request
- **AND** explain reason in PR description
- **AND** WordFlow Lab SHALL approve removal unless security concerns exist

### Requirement: Response Time SLA

WordFlow Lab SHALL commit to reviewing Pull Requests within service level:
- Automated validation results: within 5 minutes
- Initial human review triage: within 1 business day
- Full review and decision: within 3 business days
- Urgent security issues: within 24 hours

#### Scenario: Review timeline

- **WHEN** valid PR is submitted
- **THEN** automated validation SHALL complete within 5 minutes
- **AND** team SHALL acknowledge PR within 1 business day
- **AND** team SHALL complete review within 3 business days
- **AND** if more time needed, team SHALL comment with updated timeline
