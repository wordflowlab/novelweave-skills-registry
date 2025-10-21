# Skills Registry Design

## Context

NovelWeave Skills Registry 是一个基于 GitHub 的中心化 Skills 索引系统,为 NovelWeave v0.15.0 的 Skills Marketplace 提供数据源。

### Background
- NovelWeave 已实现 MCP Marketplace,使用远程配置加载
- Skills Marketplace 复用相同的技术栈和 UI 组件
- 社区需要一个简单、透明的 Skills 贡献流程

### Stakeholders
- **NovelWeave 用户**: 浏览和安装 Skills
- **Skill 开发者**: 提交和维护 Skills
- **WordFlow Lab**: 审核和维护 Registry

## Goals / Non-Goals

### Goals
- ✅ 提供统一的 Skills 元数据索引
- ✅ 自动化验证 PR 提交
- ✅ 简化社区贡献流程
- ✅ 确保 Skills 质量和安全性
- ✅ 支持官方认证机制

### Non-Goals
- ❌ 不托管 Skill 内容本身(仅索引)
- ❌ 不验证 Skill 功能是否正确
- ❌ 不处理用户安装和使用
- ❌ 不维护用户评分和评论(未来功能)

## Decisions

### 1. GitHub 作为 Registry 平台

**决策**: 使用 GitHub repository + JSON 文件作为 Registry 实现

**理由**:
- ✅ 免费托管和 CDN (raw.githubusercontent.com)
- ✅ Git 版本控制和审计历史
- ✅ PR 审核流程成熟
- ✅ GitHub Actions 免费 CI/CD
- ✅ 开发者熟悉的工作流

**备选方案**:
- npm Registry: 需要发布流程,维护成本高
- 自建 API: 需要服务器和维护,成本高
- GitHub Releases: 不适合索引,查询困难

### 2. 三层验证体系

**决策**: 格式验证(自动) + 可访问性验证(自动) + 质量验证(人工)

**理由**:
- 自动验证减少人工审核负担
- 人工审核确保内容质量和安全性
- 分层设计提供清晰的责任边界

**实现**:
```
PR 提交
  ↓
格式验证 (validate-registry.js)
  ↓
可访问性验证 (check-new-skills.js)
  ↓
人工审核 (WordFlow Lab)
  ↓
合并发布
```

### 3. registry.json Schema

**决策**: 扁平的 JSON 数组结构,包含必需字段和可选字段

**必需字段**: id, type, name, description, repository
**推荐字段**: author, category, keywords, version
**系统字段**: downloads, rating, verified, lastUpdated

**理由**:
- 简单易读,易于手动编辑
- JSON 广泛支持,工具链成熟
- 扁平结构方便验证和查询
- 字段设计参考 npm package.json

**备选方案**:
- YAML: 更易读但解析器多样性问题
- 数据库: 过于复杂,违背简单性原则

### 4. Category 分类系统

**决策**: 4 个固定类别
- `genre-knowledge` - 类型知识
- `writing-techniques` - 写作技巧
- `quality-assurance` - 质量保证
- `workflow-guide` - 工作流指导

**理由**:
- 覆盖主要使用场景
- 避免分类过多导致混乱
- 可通过 keywords 和 tags 补充

### 5. Git 安全措施

**决策**: Shallow clone + Sparse checkout + 禁用 hooks

```bash
git clone --depth 1 --filter=blob:none --sparse {repo}
git sparse-checkout set SKILL.md "*.md" examples/ templates/
git config core.hooksPath /dev/null
```

**理由**:
- 减少攻击面
- 加快下载速度
- 防止恶意 Git hooks
- 只下载必要文件

## Architecture

### Data Flow

```
社区贡献者
  ↓ (Fork & PR)
GitHub Actions (自动验证)
  ↓ (验证通过)
WordFlow Lab (人工审核)
  ↓ (审核通过)
registry.json 更新
  ↓ (HTTPS)
NovelWeave 加载
  ↓
用户浏览和安装
```

### Component Diagram

```
┌────────────────────────────────────┐
│ GitHub Repository                  │
│                                    │
│  registry.json (核心数据)          │
│                                    │
│  ├─ .github/workflows/             │
│  │    └─ validate-skill.yml        │
│  │                                 │
│  └─ scripts/                       │
│       ├─ validate-registry.js      │
│       └─ check-new-skills.js       │
└──────────────┬─────────────────────┘
               │
               ↓ (HTTPS)
┌────────────────────────────────────┐
│ NovelWeave                         │
│                                    │
│  RemoteConfigLoader                │
│    ↓                               │
│  MarketplaceManager                │
│    ↓                               │
│  Skills Marketplace UI             │
└────────────────────────────────────┘
```

### File Structure

```
novelweave-skills-registry/
├── registry.json              ⭐ 核心数据
├── README.md                  📖 用户文档
├── CONTRIBUTING.md            📖 贡献指南
├── LICENSE                    ⚖️ MIT License
├── .gitignore
├── .github/
│   └── workflows/
│       └── validate-skill.yml 🤖 验证工作流
└── scripts/
    ├── validate-registry.js   ✅ 格式验证
    └── check-new-skills.js    ✅ Skill 检测
```

## Risks / Trade-offs

### Risk: GitHub 依赖
**描述**: 完全依赖 GitHub 平台
**影响**: GitHub 宕机或政策变化影响可用性
**缓解**:
- registry.json 是纯 JSON,易于迁移
- 可快速切换到其他 Git 托管平台
- 本地缓存减少实时依赖

### Risk: 手动审核瓶颈
**描述**: 人工审核可能成为瓶颈
**影响**: 审核周期长影响社区积极性
**缓解**:
- 设定 3 个工作日 SLA
- 自动化验证减少审核工作量
- 培养社区审核员

### Trade-off: 简单性 vs 功能丰富度
**选择**: 优先简单性
**放弃**: 复杂的元数据、评论系统、自动更新统计
**理由**:
- MVP 快速上线
- 降低维护成本
- 可在后续迭代中增强

### Trade-off: 中心化 vs 去中心化
**选择**: 中心化 Registry
**放弃**: 去中心化发现机制
**理由**:
- 质量控制更容易
- 用户体验更好
- 技术实现更简单

## Migration Plan

本提案是全新系统,无需迁移。

### Rollout Plan

**Phase 1: 仓库初始化** (第 1 周)
- 创建 GitHub repository
- 初始化文件结构
- 配置 GitHub Actions

**Phase 2: 验证工作流** (第 1 周)
- 实现验证脚本
- 测试 PR 工作流
- 配置 Branch Protection

**Phase 3: 初始 Skills** (第 2 周)
- 创建 3 个官方 Skill 仓库
- 添加到 registry.json
- 测试端到端集成

**Phase 4: 社区开放** (第 3 周)
- 发布公告
- 监控和响应 PRs
- 收集反馈

### Rollback Plan

如果出现严重问题:
1. 暂停 PR 合并
2. 回滚 registry.json 到上一个稳定版本
3. NovelWeave 将继续使用缓存数据
4. 修复问题后恢复

## Performance Considerations

### registry.json 大小
- 目标: < 500KB
- 容量: ~1000+ Skills
- 加载时间: < 2 秒

### GitHub Actions 运行时间
- 目标: < 3 分钟
- 并行验证新增 Skills
- 失败快速返回

### Skill 安装时间
- Git clone --depth 1: ~3-5 秒
- Sparse checkout: 减少 50-70% 数据传输

## Open Questions

### Q1: 如何处理 Skill 更新通知?
**讨论**:
- 选项 A: NovelWeave 定期检查版本号变化
- 选项 B: GitHub webhook 推送更新
**决定**: 选项 A - 简单可靠,无需额外服务

### Q2: 是否需要弃用流程?
**讨论**:
- 如何处理不再维护的 Skills?
**建议**:
- 添加 `deprecated: true` 字段
- 在 UI 中显示警告
- 6 个月后移除

### Q3: 如何处理命名冲突?
**讨论**:
- Skill ID 必须唯一
- 如何避免命名抢注?
**建议**:
- 先到先得原则
- 鼓励使用 `author-skill-name` 格式
- WordFlow Lab 保留官方命名权

## References

- NovelWeave Agent Skills PRD v0.14
- Skills Marketplace PRD v0.15
- MCP Marketplace 实现 (src/ui/marketplace/)
- npm Registry 设计: https://docs.npmjs.com/cli/v8/using-npm/registry
