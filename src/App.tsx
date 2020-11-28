import React,{useState} from 'react';
import Button,{ButtonType,ButtonSize} from './components/Button/button'
import Alert ,{AlertType} from './components/Alert/alert'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'

function App() {
  const [isShowAlert,setIsShowAlert] = useState(true)
  return (
    <div className="App">
      <header className="App-header">
        <Menu defaultIndex={0} onSelect={(index) =>{} } mode='vertical'>
          <MenuItem index={0}>
            cool link
          </MenuItem>
          <MenuItem index={1} disabled>
            cool link 2
          </MenuItem>
          <MenuItem index={2}>
            cool link 3
          </MenuItem>
        </Menu>



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
        <Alert 
          content ='是否确认删除!'
          title ='标题'
          alertType={AlertType.Success}
          showClose= {true}
          isShowAlert = {isShowAlert}
          onClick= {() => {
            setIsShowAlert(false)
          }}
        />
      </header>
    </div>
  );
}

export default App;
