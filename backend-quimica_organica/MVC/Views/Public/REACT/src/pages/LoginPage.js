import React from 'react';

const LoginPage = () => {
  return (
    <div className="login-page">
      <video autoPlay muted loop className="video-background">
        <source src="video.mp4" type="video/mp4" />
        {/* Adicione aqui outras sources do seu vídeo, caso necessário */}
        Your browser does not support the video tag.
      </video>
      <div className="login-form">
        {/* Adicione aqui o seu formulário de login */}
      </div>
    </div>
  );
}

export default LoginPage;
