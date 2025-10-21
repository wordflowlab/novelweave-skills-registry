# 贡献指南

感谢你对 NovelWeave Skills Registry 的关注!本文档将指导你如何贡献高质量的 Skills。

## 📋 目录

1. [贡献前须知](#贡献前须知)
2. [Skill 仓库结构](#skill-仓库结构)
3. [SKILL.md 格式规范](#skillmd-格式规范)
4. [Registry Entry 格式](#registry-entry-格式)
5. [提交流程](#提交流程)
6. [审核标准](#审核标准)
7. [最佳实践](#最佳实践)
8. [常见问题](#常见问题)

## 贡献前须知

### 什么样的 Skill 适合提交?

✅ **适合的 Skill**:
- 与小说创作相关的知识和技巧
- 提供准确、专业的指导
- 有清晰的使用场景和价值
- 内容结构良好,易于理解

❌ **不适合的 Skill**:
- 与写作无关的内容
- 包含广告或推广信息
- 内容质量低、信息不准确
- 与现有 Skills 高度重复

### 贡献者承诺

提交 Skill 前,请确认你:
- [ ] 拥有 Skill 内容的版权或使用权
- [ ] 内容准确可靠,没有误导性信息
- [ ] 愿意在合理范围内维护和更新 Skill
- [ ] 同意以开源协议分享 Skill

## Skill 仓库结构

### 必需文件

```
skill-your-skill-name/
├── SKILL.md          ⭐ 必需 - Skill 主文件
├── README.md         📖 推荐 - 使用说明
├── LICENSE           ⚖️  推荐 - 开源协议
└── examples/         📁 可选 - 示例文件
    └── example.md
```

### SKILL.md 文件

这是最重要的文件,包含 Skill 的所有内容。

## SKILL.md 格式规范

### Frontmatter (必需)

SKILL.md 必须以 YAML frontmatter 开头:

```markdown
---
name: Your Skill Name
description: Clear and concise description of what this skill does
category: genre-knowledge
keywords: [keyword1, keyword2, keyword3]
version: 1.0.0
---
```

**必需字段**:
- `name`: Skill 显示名称
- `description`: 简短描述 (10-200 字符)

**推荐字段**:
- `category`: 类别 (见下方分类说明)
- `keywords`: 3-10 个关键词,用于搜索
- `version`: 语义化版本号 (MAJOR.MINOR.PATCH)

### 分类说明

选择最符合你 Skill 的类别:

| 类别 | 适用场景 | 示例 |
|------|----------|------|
| `genre-knowledge` | 特定小说类型的知识和规范 | 言情小说规范、奇幻世界构建 |
| `writing-techniques` | 写作技巧和方法论 | 对话技巧、节奏控制 |
| `quality-assurance` | 质量检查和改进 | 语法检查、情节漏洞检测 |
| `workflow-guide` | 创作流程和工作方法 | 大纲设计、修订流程 |

### Skill 内容结构

frontmatter 后面是 Skill 的主要内容:

```markdown
---
name: Romance Novel Conventions
description: Master romance genre conventions and emotional arcs
category: genre-knowledge
keywords: [romance, love, relationships, emotional-arc]
version: 1.0.0
---

# Romance Novel Conventions

## Overview
[Brief introduction to the skill]

## Core Concepts
[Main knowledge points or techniques]

## Examples
[Practical examples]

## Common Mistakes
[Things to avoid]

## Additional Resources
[Optional: references, further reading]
```

### 内容建议

- **清晰简洁**: 使用简单明了的语言
- **结构化**: 使用标题、列表、表格组织内容
- **实用性**: 提供具体可操作的建议
- **示例丰富**: 包含实际例子帮助理解
- **准确性**: 确保信息正确无误

## Registry Entry 格式

在 `registry.json` 的 `skills` 数组中添加你的 Skill 条目:

```json
{
  "id": "your-skill-name",
  "type": "skill",
  "name": "Your Skill Name",
  "description": "Clear description of what your skill does (10-200 characters)",
  "repository": "https://github.com/your-username/skill-your-skill-name",
  "author": "Your Name",
  "authorUrl": "https://github.com/your-username",
  "category": "genre-knowledge",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "version": "1.0.0",
  "tags": ["writing", "genre"],
  "verified": false
}
```

### 字段说明

**必需字段**:
- `id`: 唯一标识符,使用 kebab-case (例: `romance-writing`)
- `type`: 固定值 `"skill"`
- `name`: 显示名称 (1-100 字符)
- `description`: 详细描述 (10-200 字符)
- `repository`: GitHub HTTPS URL

**推荐字段**:
- `author`: 作者名称
- `authorUrl`: 作者链接 (GitHub profile 或个人网站)
- `category`: 分类 (见上方分类说明)
- `keywords`: 3-10 个搜索关键词
- `version`: 语义化版本号 (例: `"1.0.0"`)
- `tags`: 标签数组

**系统字段** (不要手动设置):
- `downloads`: 下载次数 (自动更新)
- `rating`: 评分 (未来功能)
- `verified`: 官方认证 (仅 WordFlow Lab 可设置为 `true`)
- `lastUpdated`: 最后更新时间 (PR 时自动更新)

### 重要规则

- ✅ `id` 必须唯一,使用 kebab-case 格式
- ✅ `repository` URL 必须唯一,一个仓库对应一个 Skill
- ✅ 初次提交时 `verified` 必须设为 `false`
- ✅ `version` 使用 semver 格式 (MAJOR.MINOR.PATCH)

## 提交流程

### 完整步骤

1. **创建 Skill 仓库**
   ```bash
   # 创建公开仓库
   gh repo create your-username/skill-your-skill-name --public
   cd skill-your-skill-name

   # 添加 SKILL.md 和 README
   # ... 编辑文件 ...

   # 提交并推送
   git add .
   git commit -m "Initial skill"
   git push origin main
   ```

2. **Fork Registry 仓库**
   ```bash
   gh repo fork wordflowlab/novelweave-skills-registry --clone
   cd novelweave-skills-registry
   ```

3. **编辑 registry.json**
   ```bash
   # 在 skills 数组中添加你的 Skill 条目
   # 确保 JSON 格式正确
   ```

4. **提交 Pull Request**
   ```bash
   git add registry.json
   git commit -m "Add skill: your-skill-name"
   git push origin main
   gh pr create --title "Add skill: your-skill-name" --body "$(cat <<'EOF'
   ## Skill 信息

   **Skill 名称**: Your Skill Name
   **Skill ID**: your-skill-name
   **Repository**: https://github.com/your-username/skill-your-skill-name

   ## 描述

   [详细描述你的 Skill]

   ## 为什么要添加这个 Skill?

   [说明这个 Skill 的价值和目标用户]

   ## 检查清单

   - [x] Skill 仓库已创建并公开
   - [x] SKILL.md 格式正确
   - [x] 本地测试通过
   - [x] 所有必需字段已填写
   - [x] verified 设置为 false
   EOF
   )"
   ```

5. **等待审核**
   - 自动验证将在 5 分钟内完成
   - 人工审核将在 3 个工作日内完成
   - 如有问题,我们会在 PR 中评论

### 提交前检查清单

在提交 PR 前,请确认:

- [ ] ✅ Skill 仓库已创建并设为公开
- [ ] ✅ SKILL.md 存在且格式正确
- [ ] ✅ Frontmatter 包含 name 和 description
- [ ] ✅ Skill 功能已测试
- [ ] ✅ Skill ID 使用 kebab-case
- [ ] ✅ Skill ID 在 registry.json 中唯一
- [ ] ✅ Repository URL 正确且可访问
- [ ] ✅ Description 清晰准确 (10-200 字符)
- [ ] ✅ Keywords 包含 3-10 个相关关键词
- [ ] ✅ Version 使用 semver 格式
- [ ] ✅ Verified 设置为 `false`

## 审核标准

### 自动验证

PR 提交后会自动检查:

| 检查项 | 标准 |
|--------|------|
| JSON 格式 | 语法正确,可解析 |
| 必需字段 | 所有必需字段存在 |
| ID 格式 | kebab-case,唯一 |
| 版本格式 | semver (x.y.z) |
| Repository 可访问 | git ls-remote 成功 |
| SKILL.md 存在 | curl 可获取 |
| Frontmatter 格式 | 包含 name 和 description |

### 人工审核

我们将评估:

| 维度 | 标准 |
|------|------|
| **内容质量** | 准确、专业、结构清晰 |
| **相关性** | 与小说写作相关 |
| **原创性** | 不是现有 Skills 的重复 |
| **安全性** | 无恶意内容、无广告 |
| **可维护性** | 作者愿意长期维护 |
| **文档完整** | 有清晰的使用说明和示例 |

### 常见拒绝原因

| 原因 | 如何改进 |
|------|----------|
| 内容质量低 | 重新组织内容、添加示例、校对准确性 |
| 与写作无关 | 调整内容使其与小说创作相关 |
| 重复现有 Skill | 合并到现有 Skill 或突出差异化 |
| 包含恶意内容 | 移除所有不当内容 |
| Repository 不可访问 | 将仓库设为公开 |
| SKILL.md 格式错误 | 参考文档修正格式 |

## 最佳实践

### 内容创作

1. **明确目标用户**: 清楚你的 Skill 是为谁服务的
2. **提供实用价值**: 确保内容对用户有实际帮助
3. **保持专注**: 一个 Skill 专注于一个主题
4. **使用示例**: 用具体例子说明概念
5. **定期更新**: 根据反馈改进内容

### 版本管理

使用语义化版本号:
- **MAJOR (1.x.x)**: 重大变更,可能不兼容
- **MINOR (x.1.x)**: 新增功能,向后兼容
- **PATCH (x.x.1)**: 错误修复,向后兼容

示例:
- `1.0.0` - 初始发布
- `1.0.1` - 修复拼写错误
- `1.1.0` - 添加新章节
- `2.0.0` - 重大重构

### 维护建议

- 及时响应 Issues 和反馈
- 定期检查内容的准确性
- 根据社区需求更新内容
- 在 README 中说明更新记录

## 常见问题

### Q: 我可以提交多个 Skills 吗?

A: 可以!每个 Skill 需要独立的仓库和 PR。

### Q: 审核需要多久?

A: 自动验证 < 5 分钟,人工审核通常在 3 个工作日内完成。

### Q: 为什么我的 PR 被拒绝?

A: 查看 PR 评论中的具体原因。常见原因包括格式错误、内容质量低或与写作无关。

### Q: 如何更新已发布的 Skill?

A:
1. 更新 Skill 仓库内容和 SKILL.md 中的 version
2. 提交 PR 更新 registry.json 中的 version 和 lastUpdated
3. 用户将收到更新通知

### Q: 可以删除我的 Skill 吗?

A: 可以。提交 PR 从 registry.json 中移除你的条目即可。

### Q: Skill 内容可以是中文吗?

A: 可以!NovelWeave 支持多语言 Skills。

### Q: 如何让我的 Skill 获得官方认证?

A: 持续提供高质量内容、积极维护、响应社区反馈。WordFlow Lab 会定期评估优秀 Skills 并授予认证。

### Q: 我发现了别人 Skill 中的错误,怎么办?

A: 可以在对应的 Skill 仓库提交 Issue,或直接提交 PR 修复。

## 需要帮助?

- **Issues**: [提交问题](https://github.com/wordflowlab/novelweave-skills-registry/issues)
- **Discussions**: [参与讨论](https://github.com/wordflowlab/novelweave-skills-registry/discussions)
- **Email**: support@novelweave.ai
- **Discord**: [加入社区](https://discord.gg/novelweave)

---

感谢你的贡献!让我们一起打造更好的写作工具生态。🎊
