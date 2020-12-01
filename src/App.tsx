import React,{useState} from 'react';
import Button,{ButtonType,ButtonSize} from './components/Button/button'
import Alert ,{AlertType} from './components/Alert/alert'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Tabs from './components/Tabs/tabs'
import TabItem  from './components/Tabs/tabItem'

function App() {
  const [isShowAlert,setIsShowAlert] = useState(true)
  return (
    <div className="App">
      <header className="App-header">
        <Tabs defaultIndex={0}>
          <TabItem  label={'one'}>
            tab one
          </TabItem>
          <TabItem  label={'two'}>
            tab two
          </TabItem>
        </Tabs>



        <Menu defaultIndex='0' onSelect={(index) =>{alert(index)}} mode="vertical" defaultOpenSubMenus={['4']}>
          <MenuItem>
            cool link
          </MenuItem>
          <MenuItem disabled>
            cool link 2
          </MenuItem>
          <MenuItem>
            cool link 3
          </MenuItem>
          <MenuItem>
            cool link 4
          </MenuItem>
          <SubMenu title="dropDown">
              <MenuItem>
                cool link
              </MenuItem>
              <MenuItem disabled>
                cool link 2
              </MenuItem>
              <MenuItem>
                cool link 3
              </MenuItem>
              <MenuItem>
                cool link 4
              </MenuItem>
          </SubMenu>
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
