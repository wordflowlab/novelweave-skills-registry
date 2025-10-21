# NovelWeave Skills Registry PRD v1.0.0

## 📋 文档信息

| 项目         | 信息                                    |
| ------------ | --------------------------------------- |
| **文档版本** | v1.0.0                                  |
| **创建日期** | 2025-10-21                              |
| **产品名称** | NovelWeave Skills Registry              |
| **仓库名称** | wordflowlab/novelweave-skills-registry  |
| **依赖版本** | NovelWeave v0.15.0（Skills Marketplace）|
| **负责人**   | WordFlow Lab                            |
| **状态**     | 📝 Implementation Ready                 |

## 修订历史

| 版本   | 日期       | 作者         | 变更说明                        |
| ------ | ---------- | ------------ | ------------------------------- |
| v1.0.0 | 2025-10-21 | AI Assistant | Skills Registry 仓库设计和实现  |

---

## 📑 目录

1. [产品背景](#产品背景)
2. [核心概念](#核心概念)
3. [registry.json 数据结构](#registryjson-数据结构)
4. [GitHub Actions 工作流](#github-actions-工作流)
5. [社区贡献流程](#社区贡献流程)
6. [文件结构说明](#文件结构说明)
7. [验证脚本详解](#验证脚本详解)
8. [安全措施](#安全措施)
9. [实施计划](#实施计划)
10. [成功标准](#成功标准)
11. [附录](#附录)

---

## 🎯 产品背景

### Registry 仓库的作用

**NovelWeave Skills Registry** 是一个中心化的元数据索引仓库，用于：

1. **Skills 发现**：提供统一的 Skills 浏览入口
2. **元数据管理**：维护所有 Skills 的基本信息
3. **质量保证**：通过验证和审核确保 Skills 质量
4. **社区协作**：支持社区贡献和反馈

### 为什么选择 GitHub？

相比其他方案，GitHub 作为 Registry 具有显著优势：

| 方案              | 优势                          | 劣势                    | 选择理由          |
| ----------------- | ----------------------------- | ----------------------- | ----------------- |
| **GitHub + JSON** | ✅ 免费托管<br>✅ Git 版本控制<br>✅ PR 审核流程<br>✅ Actions CI/CD<br>✅ 社区熟悉 | ⚠️ 手动编辑 JSON        | ✅ **最佳选择**   |
| npm Registry      | ✅ 包管理成熟                 | ❌ 需要发布流程<br>❌ 维护成本高 | 过于复杂          |
| 自建 API          | ✅ 完全可控                   | ❌ 服务器成本<br>❌ 维护负担  | 成本高            |
| GitHub Releases   | ✅ 自动化                     | ❌ 不适合索引<br>❌ 查询困难 | 不适用            |

**GitHub 的核心优势：**

```
GitHub = 版本控制 + CI/CD + 社区协作 + 免费托管
         ↓
   完美的 Registry 平台
```

### 与其他生态对比

学习业界最佳实践：

#### MCP Marketplace 模式

NovelWeave 已经成功实现了 MCP Marketplace：

```typescript
// MCP 使用远程 YAML/JSON 配置
const mcpRegistry = await fetch('api.cline.bot/v1/mcp/marketplace')

// Skills 复用相同模式
const skillsRegistry = await fetch('raw.githubusercontent.com/.../registry.json')
```

**一致性优势：**
- ✅ 相同的技术栈（MarketplaceManager, RemoteConfigLoader）
- ✅ 相同的 UI 组件（MarketplaceCard, InstallModal）
- ✅ 相同的用户体验（搜索、过滤、安装）

#### npm Registry 模式

npm 的包管理经验：

| npm 特性           | Skills Registry 应用          |
| ------------------ | ----------------------------- |
| package.json       | registry.json                 |
| 语义化版本         | semver 版本号                 |
| 依赖管理           | prerequisites 字段            |
| 发布审核           | PR 审核                       |
| 搜索和发现         | 关键词、标签、分类            |

**但更简化：**
- ❌ 不需要 npm publish 流程
- ❌ 不需要账号系统
- ❌ 不需要包托管服务
- ✅ 直接 PR 提交即可

---

## 🧠 核心概念

### Registry 职责边界

```
┌──────────────────────────────────────────────────┐
│ Skills Registry 职责                              │
├──────────────────────────────────────────────────┤
│ ✅ 维护 Skills 元数据索引                        │
│ ✅ 验证提交的数据格式                            │
│ ✅ 提供统一的数据访问接口                        │
│ ✅ 管理官方认证标识                              │
│ ✅ 收集和展示统计数据                            │
├──────────────────────────────────────────────────┤
│ ❌ 不托管 Skill 内容本身                         │
│ ❌ 不验证 Skill 功能是否正确                     │
│ ❌ 不处理用户安装和使用                          │
│ ❌ 不维护用户评分和评论                          │
└──────────────────────────────────────────────────┘
```

### 数据流向

```
┌─────────────────┐
│ 社区贡献者       │
│ - 创建 Skill 仓库 │
│ - 提交 PR        │
└────────┬────────┘
         │
         ↓
┌─────────────────────────────────────┐
│ GitHub Actions 自动验证              │
│ - JSON 格式                          │
│ - Repository 可访问性                │
│ - SKILL.md 格式                      │
└────────┬────────────────────────────┘
         │
         ↓
┌─────────────────────────────────────┐
│ WordFlow Lab 人工审核                │
│ - 内容质量                           │
│ - 安全性检查                         │
│ - 相关性验证                         │
└────────┬────────────────────────────┘
         │
         ↓
┌─────────────────────────────────────┐
│ 合并到 main 分支                     │
│ → registry.json 更新                 │
│ → Skills 立即在市场中可用            │
└────────┬────────────────────────────┘
         │
         ↓
┌─────────────────────────────────────┐
│ NovelWeave 加载 Registry             │
│ → RemoteConfigLoader 获取            │
│ → 缓存 5 分钟                        │
│ → 展示在 Marketplace                 │
└─────────────────────────────────────┘
```

### 验证机制

**三层验证体系：**

1. **格式验证（自动化）**
   - JSON 语法正确性
   - 必需字段存在性
   - 字段类型和格式
   - ID 和 URL 唯一性

2. **可访问性验证（自动化）**
   - Git repository 可访问
   - SKILL.md 文件存在
   - Frontmatter 格式正确

3. **质量验证（人工审核）**
   - 内容质量和准确性
   - 是否包含恶意内容
   - 与写作相关性
   - 描述清晰度

### 官方认证机制

```json
{
  "verified": true  // 官方认证标识
}
```

**认证标准：**

| 标准类别     | 具体要求                                    |
| ------------ | ------------------------------------------- |
| **作者**     | WordFlow Lab 官方 或 经审核的高质量贡献者   |
| **内容质量** | 准确、专业、结构清晰                        |
| **维护**     | 定期更新、响应问题、修复错误                |
| **文档**     | 完整的 README、示例、使用说明               |
| **测试**     | 经过实际使用验证                            |

**认证流程：**

1. 初始提交：`verified: false`
2. WordFlow Lab 审核
3. 审核通过：设置 `verified: true`
4. 优先展示：搜索结果中排序靠前

---

## 📊 registry.json 数据结构

### 整体结构

```json
{
  "version": "1.0.0",
  "lastUpdated": "2025-10-21T10:00:00Z",
  "skills": [
    {
      // Skill entry
    }
  ]
}
```

### 根字段定义

| 字段          | 类型   | 必需 | 说明                      | 示例                      |
| ------------- | ------ | ---- | ------------------------- | ------------------------- |
| `version`     | string | ✅   | Registry schema 版本      | `"1.0.0"`                 |
| `lastUpdated` | string | ✅   | 最后更新时间（ISO 8601）  | `"2025-10-21T10:00:00Z"`  |
| `skills`      | array  | ✅   | Skills 数组               | `[...]`                   |

### Skill Entry 完整字段

#### 必需字段

| 字段          | 类型   | 格式约束              | 说明                          | 示例                                      |
| ------------- | ------ | --------------------- | ----------------------------- | ----------------------------------------- |
| `id`          | string | kebab-case            | 唯一标识符                    | `"romance-writing"`                       |
| `type`        | string | 固定值 `"skill"`      | 条目类型                      | `"skill"`                                 |
| `name`        | string | 1-100 字符            | 显示名称                      | `"Romance Novel Conventions"`             |
| `description` | string | 10-200 字符           | 详细描述                      | `"Master romance genre conventions..."` |
| `repository`  | string | GitHub HTTPS URL      | Git 仓库地址                  | `"https://github.com/wordflowlab/skill-romance-writing"` |

#### 推荐字段

| 字段         | 类型   | 格式约束                        | 说明               | 示例                              |
| ------------ | ------ | ------------------------------- | ------------------ | --------------------------------- |
| `author`     | string | 任意字符串                      | 作者名称           | `"WordFlow Lab"`                  |
| `authorUrl`  | string | URL                             | 作者链接           | `"https://github.com/wordflowlab"` |
| `category`   | string | 枚举值                          | 分类               | `"genre-knowledge"`               |
| `keywords`   | array  | 字符串数组，3-10个              | 搜索关键词         | `["romance", "love", "言情"]`     |
| `version`    | string | semver (MAJOR.MINOR.PATCH)      | 版本号             | `"1.0.0"`                         |
| `tags`       | array  | 字符串数组                      | 标签               | `["writing", "genre"]`            |

#### 系统字段

| 字段          | 类型    | 格式约束        | 说明               | 示例                     | 维护方式      |
| ------------- | ------- | --------------- | ------------------ | ------------------------ | ------------- |
| `downloads`   | number  | >= 0            | 下载次数           | `1523`                   | 自动更新      |
| `rating`      | number  | 0-5             | 评分               | `4.8`                    | 未来功能      |
| `verified`    | boolean | true/false      | 官方认证           | `true`                   | 人工设置      |
| `lastUpdated` | string  | ISO 8601        | 最后更新时间       | `"2025-10-21T10:00:00Z"` | PR 自动更新   |

#### 高级字段

| 字段            | 类型  | 说明                        | 示例                          |
| --------------- | ----- | --------------------------- | ----------------------------- |
| `prerequisites` | array | 依赖的其他 Skills 或 MCPs   | `["dialogue-basics"]`         |

### Category 枚举值

```typescript
type SkillCategory = 
  | "genre-knowledge"      // 类型知识（romance, fantasy, mystery...）
  | "writing-techniques"   // 写作技巧（dialogue, pacing, description...）
  | "quality-assurance"    // 质量保证（grammar, consistency, plot-holes...）
  | "workflow-guide"       // 工作流指导（outlining, revision, publishing...）
```

### 完整示例

```json
{
  "version": "1.0.0",
  "lastUpdated": "2025-10-21T10:00:00Z",
  "skills": [
    {
      "id": "romance-writing",
      "type": "skill",
      "name": "Romance Novel Conventions",
      "description": "Master romance genre conventions, emotional arcs, and relationship development patterns.",
      "author": "WordFlow Lab",
      "authorUrl": "https://github.com/wordflowlab",
      "repository": "https://github.com/wordflowlab/skill-romance-writing",
      "category": "genre-knowledge",
      "keywords": ["romance", "love", "relationships", "emotional-arc", "言情"],
      "version": "1.0.0",
      "downloads": 1523,
      "rating": 4.8,
      "verified": true,
      "lastUpdated": "2025-10-21T10:00:00Z",
      "tags": ["writing", "genre"],
      "prerequisites": []
    }
  ]
}
```

### 验证规则

#### 格式验证

```javascript
// ID 格式：kebab-case
/^[a-z0-9-]+$/.test(id)

// Version 格式：semver
/^\d+\.\d+\.\d+$/.test(version)

// Repository 格式：GitHub HTTPS URL
repository.startsWith('https://github.com/')

// Category 枚举值
['genre-knowledge', 'writing-techniques', 'quality-assurance', 'workflow-guide'].includes(category)
```

#### 唯一性验证

- ✅ `id` 在 registry.json 中必须唯一
- ✅ `repository` 在 registry.json 中必须唯一
- ✅ 一个 repository 只能对应一个 skill

#### 引用完整性验证

- ✅ `prerequisites` 中引用的 skill ID 必须存在
- ✅ `repository` URL 必须可访问（GitHub API 检查）

---

## ⚙️ GitHub Actions 工作流

### validate-skill.yml

**触发条件：**
```yaml
on:
  pull_request:
    paths:
      - 'registry.json'
```

**工作流程：**

```
PR 提交修改 registry.json
         ↓
GitHub Actions 触发
         ↓
┌─────────────────────────────────┐
│ Step 1: 验证 JSON 格式          │
│ - 运行 validate-registry.js     │
│ - 检查所有字段                  │
│ - 验证唯一性                    │
└────────┬────────────────────────┘
         │
         ↓
┌─────────────────────────────────┐
│ Step 2: 检测新增 Skills         │
│ - 运行 check-new-skills.js      │
│ - git diff 对比 main 分支       │
│ - 识别新增的 skills             │
└────────┬────────────────────────┘
         │
         ↓
┌─────────────────────────────────┐
│ Step 3: 验证每个新 Skill        │
│ - git ls-remote 检查仓库        │
│ - curl 获取 SKILL.md            │
│ - 解析 frontmatter              │
│ - 验证必需字段                  │
└────────┬────────────────────────┘
         │
         ↓
┌─────────────────────────────────┐
│ Step 4: 发布验证结果            │
│ - GitHub Actions Script         │
│ - 读取 validation-results.json  │
│ - 作为 PR 评论发布              │
└─────────────────────────────────┘
         │
         ↓
┌─────────────────────────────────┐
│ 验证通过 ✅                     │
│ → 等待人工审核                  │
│                                 │
│ 验证失败 ❌                     │
│ → PR 检查失败                   │
│ → 贡献者修复后重新提交          │
└─────────────────────────────────┘
```

**验证结果示例：**

```markdown
## Skill Validation Results

✅ **registry.json validation passed**

### New Skills Detected

#### Romance Novel Conventions (`romance-writing`)

✅ Repository accessible
✅ SKILL.md valid

### Next Steps

1. ✅ Automated validation passed
2. ⏳ Awaiting manual review from WordFlow Lab team
3. 📝 Review will check content quality and relevance

Estimated review time: 3 business days
```

### update-stats.yml (未来功能)

**触发条件：**
```yaml
on:
  schedule:
    - cron: '0 0 * * 0'  # 每周日午夜运行
```

**功能：**
- 从 telemetry API 获取下载统计
- 更新 `downloads` 字段
- 自动提交更新

---

## 🤝 社区贡献流程

### 完整流程图

```
┌─────────────────────────────────────────────┐
│ 1. 创建你的 Skill Repository                │
│    - 命名：skill-{your-skill-name}          │
│    - 添加 SKILL.md                          │
│    - 测试功能                               │
└──────────────┬──────────────────────────────┘
               ↓
┌─────────────────────────────────────────────┐
│ 2. Fork novelweave-skills-registry          │
│    - GitHub UI: 点击 Fork 按钮              │
│    - 或 CLI: gh repo fork                   │
└──────────────┬──────────────────────────────┘
               ↓
┌─────────────────────────────────────────────┐
│ 3. 编辑 registry.json                       │
│    - 在 skills 数组中添加你的条目           │
│    - 填写所有必需字段                       │
│    - 设置 verified: false                   │
└──────────────┬──────────────────────────────┘
               ↓
┌─────────────────────────────────────────────┐
│ 4. 提交 Pull Request                        │
│    - 标题：Add skill: {your-skill-name}     │
│    - 描述：说明 Skill 的价值和用途          │
└──────────────┬──────────────────────────────┘
               ↓
┌─────────────────────────────────────────────┐
│ 5. 自动验证                                 │
│    - GitHub Actions 运行                    │
│    - 结果作为 PR 评论发布                   │
│    - 如有错误，修复后重新提交               │
└──────────────┬──────────────────────────────┘
               ↓
┌─────────────────────────────────────────────┐
│ 6. 人工审核                                 │
│    - WordFlow Lab 团队审核                  │
│    - 审核周期：3 个工作日                   │
│    - 可能要求修改                           │
└──────────────┬──────────────────────────────┘
               ↓
┌─────────────────────────────────────────────┐
│ 7. 合并和发布                               │
│    - PR 合并到 main                         │
│    - Skill 立即在市场中可用                 │
│    - 贡献者收到通知                         │
└─────────────────────────────────────────────┘
```

### 贡献者检查清单

在提交 PR 之前，确保：

- [ ] ✅ Skill 仓库已创建并公开
- [ ] ✅ SKILL.md 存在且格式正确
- [ ] ✅ Skill 功能已测试
- [ ] ✅ `id` 使用 kebab-case
- [ ] ✅ `id` 在 registry.json 中唯一
- [ ] ✅ `repository` URL 正确且可访问
- [ ] ✅ `description` 清晰准确（10-200 字符）
- [ ] ✅ `keywords` 包含 3-10 个相关关键词
- [ ] ✅ `version` 使用 semver 格式
- [ ] ✅ `verified` 设置为 `false`

### PR 模板

```markdown
## Skill 信息

**Skill 名称：** Romance Novel Conventions
**Skill ID：** romance-writing
**Repository：** https://github.com/username/skill-romance-writing

## 描述

这个 Skill 提供了言情小说创作的核心规范和技巧，包括情感弧线设计、关系发展模式等。

## 为什么要添加这个 Skill？

言情小说是最受欢迎的小说类型之一，但许多新手作者不了解该类型的核心规范。这个 Skill 将帮助作者掌握言情小说的关键要素。

## 目标用户

- 言情小说新手作者
- 想要学习情感弧线设计的作者
- 需要提升关系发展描写的作者

## 检查清单

- [x] Skill 仓库已创建并公开
- [x] SKILL.md 格式正确
- [x] 本地测试通过
- [x] 所有必需字段已填写
- [x] verified 设置为 false

## 截图（可选）

[如果有的话，添加使用截图或效果展示]
```

### 审核标准

#### 自动验证标准

| 检查项             | 标准                               | 工具                     |
| ------------------ | ---------------------------------- | ------------------------ |
| JSON 格式          | 语法正确，可解析                   | validate-registry.js     |
| 必需字段           | 所有必需字段存在                   | validate-registry.js     |
| ID 格式            | kebab-case                         | validate-registry.js     |
| 版本格式           | semver (x.y.z)                     | validate-registry.js     |
| Repository 可访问  | git ls-remote 成功                 | check-new-skills.js      |
| SKILL.md 存在      | curl 可获取                        | check-new-skills.js      |
| Frontmatter 格式   | 包含 name 和 description           | check-new-skills.js      |

#### 人工审核标准

| 审核维度     | 具体标准                                      | 示例问题                           |
| ------------ | --------------------------------------------- | ---------------------------------- |
| **内容质量** | 准确、专业、结构清晰                          | 内容是否准确？结构是否清晰？       |
| **相关性**   | 与小说写作相关                                | 是否真的对小说创作有帮助？         |
| **原创性**   | 不是现有 Skills 的简单重复                    | 是否与现有 Skills 重复？           |
| **安全性**   | 无恶意内容、无广告                            | 是否包含恶意链接或不当内容？       |
| **可维护性** | 作者愿意长期维护                              | 作者是否承诺维护？                 |
| **文档完整** | 有清晰的使用说明和示例                        | 文档是否完整？                     |

#### 常见拒绝原因

| 原因                 | 说明                                    | 如何改进                           |
| -------------------- | --------------------------------------- | ---------------------------------- |
| 内容质量低           | 描述不清、结构混乱、信息不准确          | 重新组织内容、添加示例、校对准确性 |
| 与写作无关           | 内容偏离小说创作主题                    | 调整内容使其与小说创作相关         |
| 重复现有 Skill       | 功能与现有 Skill 高度重复               | 合并到现有 Skill 或突出差异化      |
| 包含恶意内容         | 包含广告、恶意链接、不当内容            | 移除所有不当内容                   |
| Repository 不可访问  | 仓库私有或不存在                        | 将仓库设为公开                     |
| SKILL.md 格式错误    | Frontmatter 缺失或格式不正确            | 参考文档修正格式                   |

### 更新现有 Skill

如果你想更新自己已发布的 Skill：

1. **更新 Skill Repository**
   - 修改内容
   - 更新 SKILL.md 的 `version` 字段
   - 提交并推送

2. **提交 Registry PR**
   - Fork registry
   - 更新对应条目的 `version` 和 `lastUpdated`
   - 提交 PR：`Update skill: {skill-name} to v{version}`

3. **用户收到更新通知**
   - NovelWeave 检测到版本变化
   - 提示用户更新

---

## 📁 文件结构说明

### 完整目录树

```
novelweave-skills-registry/
├── .github/
│   └── workflows/
│       ├── validate-skill.yml          # PR 验证工作流
│       └── update-stats.yml            # 统计更新（未来）
├── scripts/
│   ├── validate-registry.js            # Registry 格式验证
│   └── check-new-skills.js             # 新 Skill 检测和验证
├── .gitignore                          # Git 忽略文件
├── LICENSE                             # MIT License
├── README.md                           # 用户文档
├── CONTRIBUTING.md                     # 贡献指南
└── registry.json                       # 核心数据文件 ⭐
```

### 关键文件说明

#### registry.json ⭐

**作用：** 核心数据文件，存储所有 Skills 的元数据

**维护方式：**
- 社区通过 PR 提交新 Skills
- WordFlow Lab 审核后合并
- GitHub Actions 自动更新统计数据

**访问方式：**
```
https://raw.githubusercontent.com/wordflowlab/novelweave-skills-registry/main/registry.json
```

**大小限制：** < 500KB（约可容纳 1000+ Skills）

#### README.md

**作用：** 仓库主页文档

**内容结构：**
1. 仓库介绍
2. 使用 Skills 的步骤
3. 提交 Skill 的流程
4. Skill categories 说明
5. 统计信息展示
6. 联系方式

#### CONTRIBUTING.md

**作用：** 详细的贡献指南

**内容结构：**
1. 贡献前须知
2. Skill Repository 结构要求
3. SKILL.md 格式规范
4. Registry Entry 格式
5. 提交流程详解
6. 审核标准
7. 最佳实践
8. FAQ

#### validate-skill.yml

**作用：** GitHub Actions 工作流配置

**触发时机：**
- PR 修改 registry.json 时

**执行步骤：**
1. Checkout 代码
2. 安装依赖
3. 运行 validate-registry.js
4. 运行 check-new-skills.js
5. 发布验证结果

#### validate-registry.js

**作用：** 验证 registry.json 格式

**验证项：**
- JSON 语法
- 必需字段
- 字段格式
- ID 唯一性
- Repository URL 格式

**输出：** validation-results.json

#### check-new-skills.js

**作用：** 检测和验证新增的 Skills

**执行逻辑：**
1. `git diff` 对比 main 分支
2. 识别新增的 skill entries
3. 检查 repository 可访问性
4. 获取和验证 SKILL.md
5. 更新 validation-results.json

**依赖：**
- Git（`git ls-remote`）
- curl（获取 SKILL.md）

---

## 🔍 验证脚本详解

### validate-registry.js

#### 核心逻辑

```javascript
function validateRegistry() {
  const results = {
    success: true,
    errors: [],
    newSkills: []
  }

  // 1. 读取和解析 JSON
  const registry = JSON.parse(fs.readFileSync('registry.json'))

  // 2. 验证根字段
  if (!registry.version) {
    results.errors.push('Missing "version" field')
  }
  if (!Array.isArray(registry.skills)) {
    results.errors.push('Missing or invalid "skills" array')
  }

  // 3. 验证每个 skill
  const seenIds = new Set()
  const seenRepos = new Set()
  
  registry.skills.forEach((skill, index) => {
    // 必需字段检查
    if (!skill.id) errors.push('Missing "id"')
    if (!skill.type) errors.push('Missing "type"')
    // ...

    // 格式验证
    if (skill.id && !/^[a-z0-9-]+$/.test(skill.id)) {
      errors.push('Invalid id format')
    }
    if (skill.version && !/^\d+\.\d+\.\d+$/.test(skill.version)) {
      errors.push('Invalid version format')
    }

    // 唯一性检查
    if (seenIds.has(skill.id)) {
      errors.push(`Duplicate skill id "${skill.id}"`)
    }
    seenIds.add(skill.id)
    
    if (seenRepos.has(skill.repository)) {
      errors.push(`Duplicate repository`)
    }
    seenRepos.add(skill.repository)

    // Category 枚举检查
    const validCategories = [
      'genre-knowledge',
      'writing-techniques',
      'quality-assurance',
      'workflow-guide'
    ]
    if (skill.category && !validCategories.includes(skill.category)) {
      errors.push(`Invalid category "${skill.category}"`)
    }
  })

  // 4. 保存结果
  fs.writeFileSync('validation-results.json', JSON.stringify(results))
  
  return results
}
```

#### 验证规则矩阵

| 字段          | 验证类型 | 规则                                         | 错误消息示例                      |
| ------------- | -------- | -------------------------------------------- | --------------------------------- |
| `id`          | 存在性   | 必须存在                                     | `Missing "id"`                    |
|               | 格式     | `/^[a-z0-9-]+$/`                             | `Invalid id format`               |
|               | 唯一性   | 在 registry 中唯一                           | `Duplicate skill id`              |
| `type`        | 存在性   | 必须存在                                     | `Missing "type"`                  |
|               | 枚举     | 必须为 `"skill"`                             | `Invalid type`                    |
| `name`        | 存在性   | 必须存在                                     | `Missing "name"`                  |
| `description` | 存在性   | 必须存在                                     | `Missing "description"`           |
| `repository`  | 存在性   | 必须存在                                     | `Missing "repository"`            |
|               | 格式     | 必须以 `https://github.com/` 开头            | `Invalid repository URL`          |
|               | 唯一性   | 在 registry 中唯一                           | `Duplicate repository`            |
| `version`     | 格式     | `/^\d+\.\d+\.\d+$/` (semver)                 | `Invalid version format`          |
| `category`    | 枚举     | 必须是 4 个预定义值之一                      | `Invalid category`                |
| `keywords`    | 类型     | 必须是数组                                   | `"keywords" must be an array`     |
| `tags`        | 类型     | 必须是数组                                   | `"tags" must be an array`         |
| `rating`      | 范围     | 0-5                                          | `Invalid rating`                  |
| `downloads`   | 范围     | >= 0                                         | `Invalid downloads`               |

### check-new-skills.js

#### 核心逻辑

```javascript
async function checkNewSkills() {
  const results = JSON.parse(
    fs.readFileSync('validation-results.json')
  )
  
  // 1. 获取 base branch 的 registry
  const baseRegistry = JSON.parse(
    execSync('git show origin/main:registry.json')
  )
  
  // 2. 读取当前 registry
  const currentRegistry = JSON.parse(
    fs.readFileSync('registry.json')
  )
  
  // 3. 找出新增的 skills
  const baseSkillIds = new Set(baseRegistry.skills.map(s => s.id))
  const newSkills = currentRegistry.skills.filter(
    s => !baseSkillIds.has(s.id)
  )
  
  console.log(`Found ${newSkills.length} new skill(s)`)
  
  // 4. 验证每个新 skill
  for (const skill of newSkills) {
    const validation = {
      repositoryAccessible: false,
      skillMdValid: false,
      repositoryError: null,
      skillMdError: null
    }
    
    try {
      // 检查 repository 可访问性
      execSync(`git ls-remote ${skill.repository} HEAD`)
      validation.repositoryAccessible = true
      
      // 获取 SKILL.md
      const rawUrl = skill.repository
        .replace('github.com', 'raw.githubusercontent.com')
        .replace(/\.git$/, '') + '/main/SKILL.md'
      
      const response = execSync(`curl -sf "${rawUrl}"`)
      
      // 验证 frontmatter
      if (!response.includes('---')) {
        validation.skillMdError = 'Missing frontmatter'
      } else {
        const frontmatterMatch = response.match(/^---\n([\s\S]*?)\n---/)
        if (!frontmatterMatch) {
          validation.skillMdError = 'Invalid frontmatter format'
        } else {
          const frontmatter = frontmatterMatch[1]
          if (!frontmatter.includes('name:')) {
            validation.skillMdError = 'Missing "name" field'
          } else if (!frontmatter.includes('description:')) {
            validation.skillMdError = 'Missing "description" field'
          } else {
            validation.skillMdValid = true
          }
        }
      }
    } catch (error) {
      validation.repositoryError = error.message
    }
    
    skill.validation = validation
    
    if (!validation.repositoryAccessible || !validation.skillMdValid) {
      results.success = false
    }
  }
  
  results.newSkills = newSkills
  
  // 5. 保存更新的结果
  fs.writeFileSync('validation-results.json', JSON.stringify(results))
}
```

#### 验证流程图

```
┌─────────────────────┐
│ git diff 对比       │
│ 识别新增的 skills   │
└──────────┬──────────┘
           ↓
     For each new skill
           ↓
┌─────────────────────────────────────┐
│ git ls-remote {repository} HEAD     │
│                                     │
│ ✅ 成功                             │
│   → repositoryAccessible = true     │
│                                     │
│ ❌ 失败                             │
│   → repositoryError = error.message │
└──────────┬──────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│ curl -sf {raw_url}/SKILL.md         │
│                                     │
│ ✅ 成功 + 格式正确                  │
│   → skillMdValid = true             │
│                                     │
│ ❌ 失败或格式错误                   │
│   → skillMdError = error details    │
└──────────┬──────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│ 更新 validation-results.json        │
│ - newSkills 数组                    │
│ - 每个 skill 的 validation 对象     │
└─────────────────────────────────────┘
```

---

## 🔒 安全措施

### 四层防护机制

```
┌─────────────────────────────────────────────┐
│ Layer 1: 自动化验证                          │
│ - JSON 格式检查                              │
│ - 字段验证                                   │
│ - Repository 可访问性                        │
│ - SKILL.md 格式                              │
│ → 防止格式错误和基础问题                     │
└──────────────┬──────────────────────────────┘
               ↓
┌─────────────────────────────────────────────┐
│ Layer 2: Git 安全措施                        │
│ - Shallow clone (--depth 1)                  │
│ - Sparse checkout（只下载必要文件）          │
│ - 禁用 Git hooks                             │
│ → 防止恶意 Git hooks 执行                    │
└──────────────┬──────────────────────────────┘
               ↓
┌─────────────────────────────────────────────┐
│ Layer 3: 内容安全                            │
│ - Skills 不能执行代码                        │
│ - 只是文本提示给 AI                          │
│ - 没有 eval 或动态执行                       │
│ → 防止代码注入攻击                           │
└──────────────┬──────────────────────────────┘
               ↓
┌─────────────────────────────────────────────┐
│ Layer 4: 人工审核                            │
│ - WordFlow Lab 团队审核                      │
│ - 检查恶意内容                               │
│ - 验证内容相关性                             │
│ → 最后一道防线                               │
└─────────────────────────────────────────────┘
```

### Git 安全配置

#### Shallow Clone

```bash
# 用户安装时使用
git clone --depth 1 {repository} {path}

# 优势：
# - 只下载最新 commit
# - 减少攻击面
# - 加快下载速度
```

#### Sparse Checkout

```bash
git clone --depth 1 --filter=blob:none --sparse {repository} {path}
git sparse-checkout set SKILL.md "*.md" examples/ templates/

# 只下载：
# - SKILL.md（必需）
# - 其他 *.md 文档
# - examples/ 示例
# - templates/ 模板

# 排除：
# - node_modules/
# - .git/ 配置
# - 其他不必要文件
```

#### 禁用 Git Hooks

```bash
# 安装后立即执行
git config core.hooksPath /dev/null

# 防止：
# - pre-commit hooks
# - post-checkout hooks
# - 其他恶意 hooks
```

### 内容安全策略

#### Skills 的本质

```
Skills 是什么？
→ 纯文本的 Markdown 文件
→ 提供给 AI 的提示和指导
→ 不包含可执行代码

Skills 不是什么？
→ 不是 JavaScript/Python 脚本
→ 不能访问文件系统
→ 不能发起网络请求
→ 不能执行系统命令
```

#### 威胁模型分析

| 威胁类型           | 风险等级 | 防护措施                              | 残留风险     |
| ------------------ | -------- | ------------------------------------- | ------------ |
| 恶意 Git hooks     | 🔴 高    | 禁用 hooks + shallow clone            | ✅ 已消除    |
| 大文件攻击         | 🟡 中    | Sparse checkout + 大小限制            | ✅ 已消除    |
| 恶意链接           | 🟡 中    | 人工审核                              | 🟡 需警惕    |
| 不当内容           | 🟡 中    | 人工审核                              | 🟡 需警惕    |
| Prompt 注入        | 🟢 低    | AI 系统的固有限制                     | 🟢 可接受    |
| 信息误导           | 🟢 低    | 社区评分 + 官方认证                   | 🟢 可接受    |

### 人工审核清单

审核者必须检查：

- [ ] ✅ 没有恶意链接（钓鱼、恶意软件等）
- [ ] ✅ 没有广告或推广内容
- [ ] ✅ 没有不当或冒犯性内容
- [ ] ✅ 内容与写作相关
- [ ] ✅ 信息准确可靠
- [ ] ✅ Repository 是真实的 Skill 仓库（不是伪装）
- [ ] ✅ 作者信息真实

### 应急响应流程

**发现恶意 Skill 时：**

1. **立即下架**
   - 从 registry.json 移除
   - PR 紧急合并到 main
   - 用户立即停止看到该 Skill

2. **通知用户**
   - 如果有用户安装，发布安全公告
   - 建议卸载该 Skill

3. **分析和防范**
   - 分析攻击方式
   - 改进验证流程
   - 更新安全文档

4. **禁止作者**
   - 将作者/Repository 加入黑名单
   - 拒绝未来提交

---

## 🚀 实施计划

### Phase 1: 仓库创建和初始化（第1周）

#### 1.1 创建 GitHub Repository

```bash
# 使用 GitHub CLI
gh repo create wordflowlab/novelweave-skills-registry \
  --public \
  --description "Official Skills Registry for NovelWeave" \
  --clone

cd novelweave-skills-registry
```

#### 1.2 初始化文件结构

```bash
# 从 .temp/ 复制准备好的文件
cp -r ../novel/.temp/novelweave-skills-registry/* .

# 文件清单：
# - registry.json
# - README.md
# - CONTRIBUTING.md
# - LICENSE
# - .gitignore
# - .github/workflows/
# - scripts/
```

#### 1.3 首次提交

```bash
git add .
git commit -m "Initial commit: Skills Registry"
git push origin main
```

### Phase 2: GitHub Actions 配置（第1周）

#### 2.1 启用 GitHub Actions

- Settings → Actions → General
- 选择 "Allow all actions and reusable workflows"

#### 2.2 配置 Branch Protection

- Settings → Branches → Add rule
- Branch name pattern: `main`
- Enable:
  - ✅ Require pull request before merging
  - ✅ Require approvals: 1
  - ✅ Require status checks to pass
    - Required checks: `validate`

#### 2.3 测试工作流

```bash
# 创建测试分支
git checkout -b test-validation

# 修改 registry.json（添加测试数据）
# ...

# 提交并创建 PR
git add registry.json
git commit -m "test: validation workflow"
git push origin test-validation

gh pr create --title "Test: Validation Workflow" \
             --body "Testing GitHub Actions"
```

**预期结果：**
- ✅ GitHub Actions 自动运行
- ✅ 验证结果作为 PR 评论发布
- ✅ PR 检查状态更新

### Phase 3: 初始 Skills 添加（第2周）

#### 3.1 创建 Skill Repositories

```bash
# Romance Writing
gh repo create wordflowlab/skill-romance-writing --public
cd skill-romance-writing
cp ../novel/src/templates/skills/genre-knowledge/romance/SKILL.md .
git add SKILL.md && git commit -m "Initial skill" && git push

# Fantasy Worldbuilding
gh repo create wordflowlab/skill-fantasy-worldbuilding --public
cd ../skill-fantasy-worldbuilding
cp ../novel/src/templates/skills/genre-knowledge/fantasy/SKILL.md .
git add SKILL.md && git commit -m "Initial skill" && git push

# Dialogue Techniques
gh repo create wordflowlab/skill-dialogue-techniques --public
cd ../skill-dialogue-techniques
# 创建或复制 SKILL.md
git add SKILL.md && git commit -m "Initial skill" && git push
```

#### 3.2 更新 Registry

registry.json 已经包含 3 个初始 skills，确保：
- ✅ Repository URLs 正确
- ✅ 所有字段完整
- ✅ `verified: true`（官方 skills）

#### 3.3 验证集成

```bash
# 在 NovelWeave 中测试
# 1. 打开 Marketplace
# 2. 切换到 Skills 标签
# 3. 验证 3 个 skills 显示
# 4. 尝试安装一个 skill
# 5. 验证安装成功
```

### Phase 4: 社区开放（第3周）

#### 4.1 发布公告

在以下渠道发布：
- GitHub Discussions
- Twitter/社交媒体
- 文档网站
- Discord 社区

**公告内容：**
```markdown
# 🎉 NovelWeave Skills Marketplace 现已开放！

我们很高兴地宣布，NovelWeave Skills Marketplace 正式开放！

## 🚀 现在可以：

- 浏览超过 3 个官方 Skills
- 一键安装 Skills 到你的项目
- 提交你自己创建的 Skills

## 📚 如何贡献？

查看我们的贡献指南：
https://github.com/wordflowlab/novelweave-skills-registry/blob/main/CONTRIBUTING.md

## 💡 需要帮助？

- 📖 文档：https://docs.novelweave.ai/skills/marketplace
- 💬 Discussions：https://github.com/wordflowlab/novelweave-skills-registry/discussions
- 🐛 Issues：https://github.com/wordflowlab/novelweave-skills-registry/issues

期待看到你的贡献！🎊
```

#### 4.2 监控和响应

- 每日检查新 PRs
- 3 个工作日内审核
- 及时回复问题和讨论
- 收集用户反馈

#### 4.3 持续改进

根据反馈优化：
- 验证流程
- 文档清晰度
- 审核标准
- 工具和脚本

### 时间线总结

| 阶段     | 时间   | 关键交付物                          | 负责人        |
| -------- | ------ | ----------------------------------- | ------------- |
| Phase 1  | 第1周  | Repository 创建，文件初始化         | WordFlow Lab  |
| Phase 2  | 第1周  | GitHub Actions 配置，Branch 保护    | WordFlow Lab  |
| Phase 3  | 第2周  | 3 个官方 Skill 仓库，集成测试       | WordFlow Lab  |
| Phase 4  | 第3周  | 社区开放，公告发布，监控响应        | WordFlow Lab  |

**总计：3 周完成**

---

## ✅ 成功标准

### 技术标准

- [ ] ✅ Registry 仓库成功创建并公开访问
- [ ] ✅ registry.json 可通过 HTTPS 访问
- [ ] ✅ GitHub Actions 验证工作流正常运行
- [ ] ✅ Branch protection 配置正确
- [ ] ✅ 验证脚本无错误
- [ ] ✅ 至少 3 个官方 Skills 可用

### 功能标准

- [ ] ✅ NovelWeave 能够成功加载 registry.json
- [ ] ✅ Skills 在 Marketplace 中正确显示
- [ ] ✅ 用户能够成功安装 Skills
- [ ] ✅ 已安装的 Skills 能够正常工作
- [ ] ✅ PR 提交后自动验证运行
- [ ] ✅ 验证结果正确发布到 PR 评论

### 文档标准

- [ ] ✅ README.md 完整且清晰
- [ ] ✅ CONTRIBUTING.md 详细且易懂
- [ ] ✅ 示例 Skill entry 正确
- [ ] ✅ 所有验证规则有文档说明
- [ ] ✅ FAQ 覆盖常见问题

### 社区标准

- [ ] ✅ 审核流程清晰明确
- [ ] ✅ 3 个工作日内响应 PRs
- [ ] ✅ 问题和讨论得到及时回复
- [ ] ✅ 社区贡献者感到受欢迎
- [ ] ✅ 至少有 1 个社区贡献的 Skill

### 性能标准

- [ ] ✅ registry.json 加载时间 < 2 秒
- [ ] ✅ GitHub Actions 运行时间 < 3 分钟
- [ ] ✅ Skill 安装时间 < 10 秒
- [ ] ✅ registry.json 大小 < 500KB

### 安全标准

- [ ] ✅ 所有安全措施已实施
- [ ] ✅ 人工审核流程已建立
- [ ] ✅ 应急响应计划已准备
- [ ] ✅ 无已知安全漏洞

---

## 📚 附录

### A. 参考资源

#### 外部参考

- **npm Registry**: https://registry.npmjs.org/
- **GitHub Actions**: https://docs.github.com/en/actions
- **Semantic Versioning**: https://semver.org/
- **JSON Schema**: https://json-schema.org/

#### 内部文档

- NovelWeave Agent Skills PRD v0.14: `docs/novelweave-agent-skills-prd-v0.14.md`
- Skills Marketplace PRD v0.15: `docs/novelweave-agent-skills-marketplace-prd-v0.15.md`
- Agent Skills Developer Guide: `docs/agent-skills-developer-guide.md`
- OpenSpec Implementation: `openspec/changes/add-skills-marketplace/`

### B. 常见问题

#### 对于用户

**Q: Skills 是免费的吗？**
A: 是的，所有 Skills 都是免费的。

**Q: 如何安装 Skill？**
A: 打开 NovelWeave Marketplace，切换到 Skills 标签，点击 Install 按钮。

**Q: Skills 会自动更新吗？**
A: 不会自动更新，但会提示你有更新可用。

**Q: 可以安装到哪里？**
A: 可以选择安装到项目（`.agent/skills/`）或个人（globalStorage）。

**Q: 如何卸载 Skill？**
A: 在 Skills Panel 中找到该 Skill，点击卸载按钮。

#### 对于贡献者

**Q: 我可以提交 Skill 吗？**
A: 可以！只要遵循贡献指南。

**Q: 审核需要多久？**
A: 通常 3 个工作日内。

**Q: 为什么我的 PR 被拒绝？**
A: 查看 PR 评论中的具体原因，常见原因包括格式错误、内容质量低、或与写作无关。

**Q: 如何更新我的 Skill？**
A: 更新 Skill 仓库后，提交 PR 更新 registry.json 中的版本号。

**Q: 可以删除我的 Skill 吗？**
A: 可以，提交 PR 从 registry.json 中移除你的条目。

### C. 技术规范摘要

#### registry.json Schema

```typescript
interface SkillsRegistry {
  version: string              // Registry schema version
  lastUpdated: string          // ISO 8601 timestamp
  skills: SkillEntry[]         // Array of skills
}

interface SkillEntry {
  // Required
  id: string                   // Unique identifier (kebab-case)
  type: "skill"                // Literal type
  name: string                 // Display name
  description: string          // Detailed description
  repository: string           // GitHub HTTPS URL

  // Recommended
  author?: string              // Author name
  authorUrl?: string           // Author URL
  category?: SkillCategory     // Category
  keywords?: string[]          // Search keywords
  version?: string             // Semver version
  tags?: string[]              // Tags

  // System
  downloads?: number           // Download count
  rating?: number              // Rating (0-5)
  verified?: boolean           // Official verification
  lastUpdated?: string         // Last update timestamp
  
  // Advanced
  prerequisites?: string[]     // Dependencies
}

type SkillCategory =
  | "genre-knowledge"
  | "writing-techniques"
  | "quality-assurance"
  | "workflow-guide"
```

#### 验证规则速查

| 规则                     | 正则/逻辑                            |
| ------------------------ | ------------------------------------ |
| ID 格式                  | `/^[a-z0-9-]+$/`                     |
| Version 格式             | `/^\d+\.\d+\.\d+$/`                  |
| Repository URL           | `startsWith('https://github.com/')`  |
| Category 枚举            | 4 个预定义值之一                     |
| Rating 范围              | `0 <= rating <= 5`                   |
| Downloads 范围           | `downloads >= 0`                     |

### D. 联系方式

- **GitHub Issues**: https://github.com/wordflowlab/novelweave-skills-registry/issues
- **GitHub Discussions**: https://github.com/wordflowlab/novelweave-skills-registry/discussions
- **Email**: support@novelweave.ai
- **Discord**: https://discord.gg/novelweave

---

**文档结束**

*最后更新：2025-10-21*
*版本：v1.0.0*
*作者：WordFlow Lab*

