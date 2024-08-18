import { useState } from 'react';
import { ReactComponent as ReactLogo } from './assets/react.svg';
import { ReactComponent as ViteLogo } from './assets/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  console.log(ReactLogo);

  return (
    <>
      <div
        className={
          'flex gap-4 flex-dir flex-1 justify-center w-[100vw] h-[100vh]'
        }
      >
        <a href="https://vitejs.dev" target="_blank">
          <ViteLogo className="flex flex-1 justify-center w-[100vw] h-[100vh]" />
        </a>
        <a href="https://react.dev" target="_blank">
          <ReactLogo className="flex flex-1 justify-center w-[100vw] h-[100vh]" />
        </a>
      </div>
      <h1>Vite + React</h1>

      <div className="card">
        <button
          onClick={() => {
            setCount((count) => count + 1);
          }}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div className="flex justify-center">
        <div className="text-3xl">hello</div>
        <div className={'text-2xl'}>tailwind</div>
      </div>
    </>
  );
}

export default App;
