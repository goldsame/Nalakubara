import React from 'react';
import './PrivacyPage.css';

const PrivacyPage = () => {
  return (
    <div className="privacy-page">
      <h1 className="privacy-title">隐私政策</h1>
      <p className="privacy-date">最后更新: 2023年10月15日</p>
      
      <div className="privacy-section">
        <h2>1. 引言</h2>
        <p>
          欢迎访问CrazyGames。我们重视您的隐私，并致力于保护您的个人信息。本隐私政策旨在向您说明我们如何收集、使用、披露和保护您的个人信息。
        </p>
        <p>
          使用我们的网站和服务，即表示您同意本隐私政策中描述的做法。如果您不同意本政策的任何部分，请不要使用我们的网站或服务。
        </p>
      </div>
      
      <div className="privacy-section">
        <h2>2. 信息收集</h2>
        <p>
          我们可能收集以下类型的信息：
        </p>
        <ul>
          <li>
            <strong>个人识别信息：</strong> 当您注册账户、参与比赛或联系我们时，我们可能会收集您的姓名、电子邮件地址、用户名和密码。
          </li>
          <li>
            <strong>使用数据：</strong> 我们自动收集有关您如何使用我们网站的信息，包括您访问的页面、点击的链接、游戏时间和偏好。
          </li>
          <li>
            <strong>设备信息：</strong> 我们可能收集有关您使用的设备的信息，包括IP地址、浏览器类型、操作系统和设备标识符。
          </li>
          <li>
            <strong>Cookie和类似技术：</strong> 我们使用cookie和类似技术来收集信息并改善您的体验。
          </li>
        </ul>
      </div>
      
      <div className="privacy-section">
        <h2>3. 信息使用</h2>
        <p>
          我们使用收集的信息：
        </p>
        <ul>
          <li>提供、维护和改进我们的服务</li>
          <li>处理和完成交易</li>
          <li>发送与您的账户相关的通知</li>
          <li>提供客户支持</li>
          <li>个性化您的体验</li>
          <li>监控和分析使用趋势</li>
          <li>防止欺诈和滥用</li>
        </ul>
      </div>
      
      <div className="privacy-section">
        <h2>4. 信息共享</h2>
        <p>
          我们不会出售或出租您的个人信息给第三方用于营销目的。我们可能在以下情况下共享您的信息：
        </p>
        <ul>
          <li>
            <strong>服务提供商：</strong> 我们可能与帮助我们运营业务的第三方服务提供商共享信息。
          </li>
          <li>
            <strong>法律要求：</strong> 如果法律要求或为了保护我们的权利，我们可能会披露您的信息。
          </li>
          <li>
            <strong>业务转让：</strong> 如果我们参与合并、收购或资产出售，您的信息可能会被转让。
          </li>
          <li>
            <strong>您的同意：</strong> 我们可能在获得您的同意后共享您的信息。
          </li>
        </ul>
      </div>
      
      <div className="privacy-section">
        <h2>5. 数据安全</h2>
        <p>
          我们采取合理的措施保护您的个人信息免受未经授权的访问、使用或披露。然而，没有任何网站或互联网传输是完全安全的，我们不能保证您的信息的绝对安全。
        </p>
      </div>
      
      <div className="privacy-section">
        <h2>6. 您的权利</h2>
        <p>
          根据适用法律，您可能有权：
        </p>
        <ul>
          <li>访问我们持有的关于您的个人信息</li>
          <li>更正不准确或不完整的信息</li>
          <li>删除您的个人信息</li>
          <li>限制或反对处理您的信息</li>
          <li>数据可携带性</li>
        </ul>
        <p>
          如需行使这些权利，请通过以下联系方式与我们联系。
        </p>
      </div>
      
      <div className="privacy-section">
        <h2>7. 联系我们</h2>
        <p>
          如果您对本隐私政策有任何疑问或顾虑，请联系我们：
        </p>
        <p>
          电子邮件：privacy@crazygames.com<br />
          地址：中国北京市海淀区中关村科技园
        </p>
      </div>
    </div>
  );
};

export default PrivacyPage;