# Registry Data Structure

## ADDED Requirements

### Requirement: registry.json Schema

The Skills Registry SHALL maintain a `registry.json` file with the following structure:
- Root object with `version`, `lastUpdated`, and `skills` fields
- `skills` SHALL be an array of Skill entries
- Each Skill entry MUST contain required fields: `id`, `type`, `name`, `description`, `repository`

#### Scenario: Valid registry.json

- **WHEN** reading registry.json
- **THEN** it SHALL parse as valid JSON
- **AND** contain version "1.0.0"
- **AND** contain lastUpdated as ISO 8601 timestamp
- **AND** contain skills array

#### Scenario: Skills array structure

- **WHEN** accessing skills array
- **THEN** each entry SHALL have unique id
- **AND** each entry SHALL have type "skill"
- **AND** each entry SHALL have non-empty name and description
- **AND** each entry SHALL have valid GitHub repository URL

### Requirement: Skill Entry Required Fields

Every Skill entry in registry.json MUST include the following fields:
- `id`: Unique identifier in kebab-case format (`^[a-z0-9-]+$`)
- `type`: Fixed value "skill"
- `name`: Display name (1-100 characters)
- `description`: Detailed description (10-200 characters)
- `repository`: GitHub HTTPS URL starting with `https://github.com/`

#### Scenario: ID validation

- **WHEN** validating Skill entry
- **THEN** id SHALL match regex `^[a-z0-9-]+$`
- **AND** id SHALL be unique across all entries
- **AND** id SHALL be present and non-empty

#### Scenario: Type validation

- **WHEN** validating Skill entry
- **THEN** type field SHALL exist
- **AND** type SHALL equal "skill" exactly

#### Scenario: Repository URL validation

- **WHEN** validating repository field
- **THEN** it SHALL start with "https://github.com/"
- **AND** it SHALL be unique across all entries
- **AND** one repository SHALL map to exactly one Skill

### Requirement: Skill Entry Optional Fields

Skill entries SHALL support the following optional recommended and system fields:

Recommended fields (MAY be included):
- `author`: Author name (any string)
- `authorUrl`: Author URL
- `category`: One of the predefined categories
- `keywords`: Array of 3-10 search keywords
- `version`: Semantic version (MAJOR.MINOR.PATCH)
- `tags`: Array of tags

System fields (MUST be validated if present):
- `downloads`: Download count (>= 0)
- `rating`: Rating (0-5)
- `verified`: Official verification flag (boolean)
- `lastUpdated`: Last update timestamp (ISO 8601)

Advanced fields (MAY be included):
- `prerequisites`: Array of dependency Skill IDs

#### Scenario: Category enumeration

- **WHEN** Skill entry includes category field
- **THEN** category SHALL be one of:
  - "genre-knowledge"
  - "writing-techniques"
  - "quality-assurance"
  - "workflow-guide"
- **OR** category MAY be omitted

#### Scenario: Version format

- **WHEN** Skill entry includes version field
- **THEN** version SHALL match semver pattern `^\d+\.\d+\.\d+$`
- **OR** version MAY be omitted

#### Scenario: Rating range

- **WHEN** Skill entry includes rating field
- **THEN** rating SHALL be between 0 and 5 inclusive
- **OR** rating MAY be omitted

#### Scenario: Downloads validation

- **WHEN** Skill entry includes downloads field
- **THEN** downloads SHALL be non-negative integer
- **OR** downloads MAY be omitted

### Requirement: Field Type Validation

The registry SHALL enforce correct data types for all fields:
- String fields: id, type, name, description, repository, author, authorUrl, category, version
- Array fields: keywords, tags, prerequisites
- Number fields: downloads, rating
- Boolean fields: verified

#### Scenario: Array field validation

- **WHEN** validating keywords or tags field
- **THEN** it SHALL be an array
- **AND** all array elements SHALL be strings
- **OR** field MAY be omitted

#### Scenario: Prerequisites validation

- **WHEN** Skill entry includes prerequisites
- **THEN** prerequisites SHALL be an array of strings
- **AND** each string SHALL reference an existing Skill ID in the registry
- **OR** prerequisites MAY be omitted

### Requirement: Uniqueness Constraints

The registry SHALL enforce uniqueness constraints:
- Skill `id` MUST be unique across all entries
- `repository` URL MUST be unique across all entries
- One repository MAY NOT be associated with multiple Skills

#### Scenario: Duplicate ID detection

- **WHEN** validating registry.json
- **AND** two or more Skill entries have the same id
- **THEN** validation SHALL fail with error "Duplicate skill id"

#### Scenario: Duplicate repository detection

- **WHEN** validating registry.json
- **AND** two or more Skill entries have the same repository URL
- **THEN** validation SHALL fail with error "Duplicate repository"

### Requirement: Size and Performance Limits

The registry SHALL maintain reasonable size for performance:
- registry.json total size SHOULD be < 500KB
- This allows approximately 1000+ Skill entries
- Loading time SHOULD be < 2 seconds over HTTPS

#### Scenario: Size monitoring

- **WHEN** registry.json is updated
- **THEN** file size SHOULD be checked
- **AND** warning SHOULD be issued if size exceeds 400KB
- **AND** additional optimization MAY be required if size exceeds 500KB
