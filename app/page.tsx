import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "陶教授学习训练中心" },
  description: "进入财富大脑训练营或 SFBT Solution Island，在互动练习中学习与成长。",
};

const modules = [
  {
    href: "/wealth-brain/",
    className: "wealth",
    eyebrow: "财富思维训练",
    icon: "💰",
    title: "财富大脑训练营",
    description:
      "把一本书变成一场训练大脑的游戏，从概念学习走向行动与复盘。",
    features: ["蓝图式学习", "费曼输出", "错题智能复习"],
    action: "进入财富大脑",
  },
  {
    href: "/sfbt",
    className: "sfbt",
    eyebrow: "焦点解决短期治疗",
    icon: "🌿",
    title: "Solution Island · SFBT",
    description:
      "沿着 100 个核心知识点前进，用讲解、案例和挑战练习掌握助人对话。",
    features: ["100 个学习关卡", "情境化挑战", "个人进度记录"],
    action: "进入 SFBT 训练",
  },
];

export default function Home() {
  return (
    <main className="hub-shell">
      <div className="hub-orb hub-orb-one" aria-hidden="true" />
      <div className="hub-orb hub-orb-two" aria-hidden="true" />
      <header className="hub-nav">
        <a className="hub-brand" href="/" aria-label="返回学习训练中心首页">
          <span className="hub-brand-mark">T</span>
          <span>
            <b>TAO LEARNING LAB</b>
            <small>陶教授学习训练中心</small>
          </span>
        </a>
        <span className="hub-nav-note">选择一个模块，开始今天的练习</span>
      </header>

      <section className="hub-hero">
        <p className="hub-kicker">LEARN · PRACTICE · REFLECT</p>
        <h1>
          把知识，变成
          <em>可以练习的旅程。</em>
        </h1>
        <p className="hub-lead">
          两套互动训练，连接理解、实践与反馈。你的每一次点击，都是一次向前的小步。
        </p>
      </section>

      <section className="module-grid" aria-label="学习模块">
        {modules.map((module, index) => (
          <a
            className={["module-card", module.className].join(" ")}
            href={module.href}
            key={module.href}
          >
            <div className="module-card-top">
              <span className="module-number">0{index + 1}</span>
              <span className="module-icon" aria-hidden="true">
                {module.icon}
              </span>
            </div>
            <p className="module-eyebrow">{module.eyebrow}</p>
            <h2>{module.title}</h2>
            <p className="module-description">{module.description}</p>
            <ul>
              {module.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <span className="module-action">
              {module.action} <i aria-hidden="true">→</i>
            </span>
          </a>
        ))}
      </section>

      <footer className="hub-footer">
        <span>Prof. Tao · Huzhou Normal University</span>
        <span>学习不是收藏答案，而是练出新的可能。</span>
      </footer>
    </main>
  );
}
