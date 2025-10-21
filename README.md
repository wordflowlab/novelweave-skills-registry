# NovelWeave Skills Registry

官方的 NovelWeave Skills 索引仓库,为 [NovelWeave](https://github.com/wordflowlab/novel) Skills Marketplace 提供数据源。

## 📖 什么是 Skills Registry?

NovelWeave Skills Registry 是一个中心化的元数据索引,用于:

- ✨ **Skills 发现** - 提供统一的 Skills 浏览入口
- 📊 **元数据管理** - 维护所有 Skills 的基本信息
- ✅ **质量保证** - 通过验证和审核确保 Skills 质量
- 🤝 **社区协作** - 支持社区贡献和反馈

## 🚀 如何使用 Skills

### 在 NovelWeave 中安装 Skills

1. 打开 NovelWeave 应用
2. 导航到 Marketplace
3. 切换到 "Skills" 标签
4. 浏览或搜索 Skills
5. 点击 "Install" 按钮安装

### Skills 分类

我们将 Skills 分为以下类别:

| 类别 | 说明 | 示例 |
|------|------|------|
| **genre-knowledge** | 类型知识和规范 | Romance, Fantasy, Mystery |
| **writing-techniques** | 写作技巧和方法 | Dialogue, Pacing, Description |
| **quality-assurance** | 质量保证和检查 | Grammar, Consistency, Plot Holes |
| **workflow-guide** | 工作流程指导 | Outlining, Revision, Publishing |

## 🤝 如何贡献 Skills

我们欢迎社区贡献高质量的 Skills!

### 快速开始

1. **创建 Skill 仓库**
   ```bash
   # 创建新仓库,命名格式: skill-{your-skill-name}
   gh repo create your-username/skill-your-skill-name --public
   ```

2. **添加 SKILL.md**
   ```markdown
   ---
   name: Your Skill Name
   description: Clear description of what your skill does
   category: genre-knowledge
   keywords: [keyword1, keyword2, keyword3]
   ---

   # Your Skill Content
   ```

3. **Fork 本仓库**
   ```bash
   gh repo fork wordflowlab/novelweave-skills-registry --clone
   ```

4. **编辑 registry.json**
   ```json
   {
     "id": "your-skill-name",
     "type": "skill",
     "name": "Your Skill Name",
     "description": "Clear description (10-200 characters)",
     "repository": "https://github.com/your-username/skill-your-skill-name",
     "author": "Your Name",
     "authorUrl": "https://github.com/your-username",
     "category": "genre-knowledge",
     "keywords": ["keyword1", "keyword2", "keyword3"],
     "version": "1.0.0",
     "verified": false
   }
   ```

5. **提交 Pull Request**
   ```bash
   git add registry.json
   git commit -m "Add skill: your-skill-name"
   git push origin main
   gh pr create --title "Add skill: your-skill-name"
   ```

### 详细指南

请阅读 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解:
- Skill 仓库结构要求
- SKILL.md 格式规范
- 审核标准和流程
- 最佳实践建议

## 📊 统计信息

<!-- 这部分将来会自动更新 -->
- **总 Skills 数**: 0
- **官方认证**: 0
- **社区贡献**: 0

## 🔒 安全和质量

### 验证流程

每个提交的 Skill 都会经过:

1. **自动化验证** (< 5 分钟)
   - JSON 格式检查
   - 必需字段验证
   - Repository 可访问性
   - SKILL.md 格式验证

2. **人工审核** (< 3 个工作日)
   - 内容质量评估
   - 安全性检查
   - 相关性验证

### 官方认证

带有 `verified: true` 标识的 Skills 表示:
- ✅ 由 WordFlow Lab 官方创建或认证
- ✅ 经过严格的质量审核
- ✅ 定期维护和更新
- ✅ 在搜索结果中优先展示

## 📞 联系我们

- **Issues**: [GitHub Issues](https://github.com/wordflowlab/novelweave-skills-registry/issues)
- **Discussions**: [GitHub Discussions](https://github.com/wordflowlab/novelweave-skills-registry/discussions)
- **Email**: support@novelweave.ai
- **Discord**: [NovelWeave Community](https://discord.gg/novelweave)

## 📄 许可证

本仓库采用 [MIT License](./LICENSE)。

## 🙏 鸣谢

感谢所有为 NovelWeave Skills 生态系统做出贡献的开发者!

---

**由 [WordFlow Lab](https://github.com/wordflowlab) 维护** | [NovelWeave](https://github.com/wordflowlab/novel) | [文档](https://docs.novelweave.ai)
