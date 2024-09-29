import { useState } from "react";

function App() {
  const [cargando, setCargando] = useState(true);

  const handleImageLoad = () => {
    setCargando(false);
  };

  return (
    <>
 <div>
      {cargando && <p>Cargando...</p>}
      <img
        // put some image from the internet
        src={""}
        alt={"oo"}
        style={{width: '300px', height: '300px', display: cargando ? 'none' : 'block' }}
        onLoad={handleImageLoad}
      />
      <img
        src={"https://kive.ai/assets/login-41fe131e.webp"}
        style={{width: '300px', height: '300px'}}
        alt={"oo"}
      />
    </div>
    </>
  )
}

export default App
