# Initialize Skills Registry

## Why

NovelWeave 需要一个中心化的 Skills Registry 来支持 Skills Marketplace 功能。目前 Skills 的发现和分发缺乏统一的索引和管理机制,用户无法方便地浏览、搜索和安装社区贡献的 Skills。

创建 `novelweave-skills-registry` 仓库将提供:
- 统一的 Skills 元数据索引 (registry.json)
- 自动化的验证和审核流程
- 社区贡献的标准化流程
- 官方认证机制

## What Changes

本提案初始化 Skills Registry 的核心功能:

- **Registry 数据结构**: 定义 registry.json 的 schema 和验证规则
- **自动化验证**: GitHub Actions 工作流,用于 PR 提交时的自动验证
- **社区贡献流程**: 标准化的 Skill 提交、审核和发布流程
- **安全措施**: 四层防护机制,包括格式验证、Git 安全、内容安全和人工审核

这是一个全新的仓库和系统,不涉及破坏性变更。

## Impact

### 新增能力
- `registry-data-structure` - registry.json 数据结构定义
- `automated-validation` - GitHub Actions 验证工作流
- `community-contribution` - 社区贡献流程
- `security-measures` - 安全防护机制

### 影响的代码
- 新建仓库文件:
  - `registry.json` - 核心数据文件
  - `.github/workflows/validate-skill.yml` - 验证工作流
  - `scripts/validate-registry.js` - 格式验证脚本
  - `scripts/check-new-skills.js` - Skill 检测脚本
  - `README.md` - 用户文档
  - `CONTRIBUTING.md` - 贡献指南

### 依赖关系
- NovelWeave v0.15.0 已实现 Skills Marketplace UI
- 本 Registry 为 NovelWeave Marketplace 提供数据源
- Skills 仓库需遵循 SKILL.md 格式规范

## Success Criteria

- [ ] registry.json 通过严格验证
- [ ] GitHub Actions 工作流正常运行
- [ ] 至少 3 个官方 Skills 可用
- [ ] 文档完整且清晰
- [ ] 安全措施已实施
