import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';


import { updateAuthByID, getAuthByID } from './services/api';
import publicRoute from './config/router';
import ChatLayout from './layouts/ChatLayout';
import './app.scss';
import socket from './config/socketIO';
import NotifyAddFriend from './components/NotifyAddFriend/NotifyAddFriend';

function App() {
  const dispatch = useDispatch()
  const { currentAuth } = useSelector(state => state.auth)
  const options = {
    autoClose: 6000,
    hideProgressBar: true,
    pauseOnHover: true,
    progress: undefined,
  };

  useEffect(() => {
    const IDAuth = currentAuth?.auth?._id
    socket.connect()
    socket.emit('user-online', IDAuth)
    socket.on('recevie-add-friend', async IDAuthSend => {
      updateAuthByID(currentAuth?.auth._id, dispatch)
      const auth = await getAuthByID(IDAuthSend)
      toast.success(({ closeToast }) => <NotifyAddFriend data={auth} title={'vừa gửi lời mời kết bạn.'} />, options)
    })

    socket.on('notify_accept_request_add_friend', async IDAuthAccept => {
      const auth = await getAuthByID(IDAuthAccept)
      toast.success(({ closeToast }) => <NotifyAddFriend data={auth} title={'vừa chấp nhận lời mời kết bạn.'} />, options)
    })
  }, [])


  return (
    <Router>
      <div className="App">
        <Routes>
          {
            publicRoute.map((route) => {
              let Layout = ChatLayout
              if (route.layout) Layout = route.layout
              const Page = route.page

              return <Route
                path={route.path}
                element={<Layout>
                  <Page />
                </Layout>}
                key={route.path}
              />
            })
          }
        </Routes>
      </div>
    </Router>
  );
}




export default App;
