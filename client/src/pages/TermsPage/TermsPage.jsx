import React from 'react';
import './TermsPage.css';

const TermsPage = () => {
  return (
    <div className="terms-page">
      <h1 className="terms-title">服务条款</h1>
      <p className="terms-date">最后更新: 2023年10月15日</p>
      
      <div className="terms-section">
        <h2>1. 接受条款</h2>
        <p>
          欢迎使用CrazyGames。通过访问或使用我们的网站、服务或应用程序，您同意受本服务条款的约束。如果您不同意这些条款的任何部分，请不要使用我们的服务。
        </p>
      </div>
      
      <div className="terms-section">
        <h2>2. 服务描述</h2>
        <p>
          CrazyGames提供一个在线游戏平台，用户可以在此访问和玩各种游戏。我们保留随时修改、暂停或终止服务的权利，恕不另行通知。
        </p>
      </div>
      
      <div className="terms-section">
        <h2>3. 用户账户</h2>
        <p>
          某些功能可能需要您创建账户。您负责维护您账户的保密性，并对发生在您账户下的所有活动负责。您同意：
        </p>
        <ul>
          <li>提供准确、完整和最新的信息</li>
          <li>保护您的账户安全，包括密码</li>
          <li>立即通知我们任何未经授权使用您账户的情况</li>
          <li>对您账户下的所有活动负责</li>
        </ul>
        <p>
          我们保留在我们认为适当的情况下拒绝服务、终止账户或取消订单的权利。
        </p>
      </div>
      
      <div className="terms-section">
        <h2>4. 用户行为</h2>
        <p>
          使用我们的服务时，您同意不会：
        </p>
        <ul>
          <li>违反任何适用的法律或法规</li>
          <li>侵犯他人的知识产权或其他权利</li>
          <li>发布、上传或分享任何非法、有害、威胁、辱骂、骚扰、诽谤、淫秽或其他不适当的内容</li>
          <li>尝试未经授权访问我们的系统或其他用户的账户</li>
          <li>使用我们的服务进行任何商业目的，除非经我们明确许可</li>
          <li>干扰或破坏我们服务的正常运行</li>
        </ul>
      </div>
      
      <div className="terms-section">
        <h2>5. 知识产权</h2>
        <p>
          我们的网站、服务和内容（包括但不限于文本、图形、徽标、图标、图像、音频剪辑、下载和软件）是CrazyGames或其许可方的财产，受版权、商标和其他知识产权法保护。
        </p>
        <p>
          未经我们明确书面许可，您不得复制、修改、创建衍生作品、公开展示、表演、重新发布、下载、存储或传输我们的任何内容。
        </p>
      </div>
      
      <div className="terms-section">
        <h2>6. 免责声明</h2>
        <p>
          我们的服务按"原样"和"可用"基础提供，不提供任何形式的保证，无论是明示的还是暗示的。我们不保证服务将不间断、及时、安全或无错误，也不保证结果将准确或可靠。
        </p>
      </div>
      
      <div className="terms-section">
        <h2>7. 责任限制</h2>
        <p>
          在法律允许的最大范围内，CrazyGames及其关联公司、员工、代理人、合作伙伴和许可方不对任何间接、偶然、特殊、后果性或惩罚性损害负责，包括但不限于利润损失、数据损失、业务中断或任何其他损害。
        </p>
      </div>
      
      <div className="terms-section">
        <h2>8. 条款修改</h2>
        <p>
          我们保留随时修改这些条款的权利。修改后的条款将在我们的网站上发布时生效。继续使用我们的服务即表示您接受修改后的条款。
        </p>
      </div>
      
      <div className="terms-section">
        <h2>9. 联系我们</h2>
        <p>
          如果您对这些服务条款有任何疑问，请联系我们：
        </p>
        <p>
          电子邮件：terms@crazygames.com<br />
          地址：中国北京市海淀区中关村科技园
        </p>
      </div>
    </div>
  );
};

export default TermsPage;