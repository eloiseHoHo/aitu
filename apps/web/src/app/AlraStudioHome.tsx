import './alra-studio-home.scss';

export function AlraStudioHome() {
  return (
    <div className="alra-home">
      <aside className="alra-home__sidebar">
        <div>
          <p className="alra-home__label">Alra Studio</p>
          <h1>内部内容素材平台</h1>
        </div>
        <p className="alra-home__hint">白板/协作/思维导图/流程图能力已暂时关闭，当前聚焦素材生产流程。</p>
      </aside>

      <main className="alra-home__content">
        <section className="alra-home__card">
          <p className="alra-home__section-label">素材生产</p>
          <h2>欢迎进入 Alra Studio</h2>
          <p>下一步我们将围绕市场、广告、设计团队的素材管理与制作链路，逐步上线模板、任务流和审批能力。</p>
          <div className="alra-home__status">
            <span className="dot" />
            当前状态：内部版本（白板相关入口已关闭）
          </div>
        </section>
      </main>
    </div>
  );
}
