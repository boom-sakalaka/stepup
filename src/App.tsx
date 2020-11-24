import React from 'react';
import Button,{ButtonType,ButtonSize} from './components/Button/button'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button size={ButtonSize.Small} autoFocus className="my-test">Hello</Button>
        <Button size={ButtonSize.Small} btnType={ButtonType.Primary} onClick={(e) => {e.preventDefault(); alert(111)}}>Hello</Button>
        <Button size={ButtonSize.Small} btnType={ButtonType.Danger} >Hello</Button>
        <Button btnType={ButtonType.Link} href="https://www.baidu.com" disabled>BaiDu Link</Button>
        <Button btnType={ButtonType.Link} href="https://www.baidu.com" size={ButtonSize.large }>BaiDu Link</Button>
        <br/>
        <Button disabled>Hello</Button>
        <Button btnType={ButtonType.Primary}>Hello</Button>
        <Button btnType={ButtonType.Danger}>Hello</Button>
        <br/>
        <Button size={ButtonSize.large} disabled>Hello</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.large}>Hello Hello</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.large}>Hello</Button>
        <br/>
       
      </header>
    </div>
  );
}

export default App;
