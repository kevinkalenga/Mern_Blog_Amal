// import { Sidebar } from "flowbite-react"
// import {HiArrowSmRight, HiUser} from 'react-icons/hi'
// import { useEffect, useState } from "react"
// import {Link, useLocation} from 'react-router-dom'

// export default function DashSidebar () {
  
//      const location = useLocation();
//      const [tab, setTab] = useState()

//       useEffect(() => {
//          const urlParams = new URLSearchParams(location.search);
//          const tabFromUrl =  urlParams.get('tab');
//          if(tabFromUrl) {
//            setTab(tabFromUrl)
//          }
//        }, [location.search])
  
//     return (
//     <Sidebar className="w-full md:w-56">
//        <Sidebar.Item>
//             <Sidebar.ItemGroup>
//                 <Link to='/dashboard?tab=profile'>
//                    <Sidebar.Item
//                      active={tab === 'profile'}
//                      icon={HiUser}
//                      label={'User'}
//                      labelColor='dark'
//                    >
//                      Profile
//                    </Sidebar.Item>
//                    <Sidebar.Item
//                      icon={HiArrowSmRight}
//                      className='cursor-pointer'
//                    >
//                      Déconnexion
//                    </Sidebar.Item>

//                 </Link>
//             </Sidebar.ItemGroup>
//        </Sidebar.Item>
//     </Sidebar>
//   )
// }

import { Sidebar, SidebarItem, SidebarItemGroup } from "flowbite-react";
import { HiArrowSmRight, HiUser, HiDocumentText,HiAnnotation, HiChartPie } from "react-icons/hi";
import {HiOutlineUserGroup} from "react-icons/hi2";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function DashSidebar() {
  const {currentUser} = useSelector((state) => state.user)
  
  const location = useLocation();
  const [tab, setTab] = useState();
  const dispatch = useDispatch()

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

     
      const handleSignOut = async() => {
       try {
         const res = await fetch('/api/user/signout/', {
            method:'POST',
         })
         const data = await res.json();
          if(!res.ok) {
           console.log(data.message)
          } else {
           dispatch(signoutSuccess())
          }
       } catch (error) {
         console.log(error.message);
       }
     }
  
  
  return (
   

      <Sidebar className="w-full md:w-56">
            <SidebarItemGroup>
                  
                <SidebarItem>
                    {
                    currentUser && currentUser.isAdmin && (
                      <Link to="/dashboard?tab=dash">
                        <SidebarItem
                         active={tab === "dash" || !tab}
                         icon={HiChartPie}
                         as='div'
                        >
                          Dashboard 
                        </SidebarItem>
                      </Link>
                    )
                  }
                </SidebarItem>
                
                <SidebarItem
                    as={Link}
                    to="/dashboard?tab=profile"
                    icon={HiUser}
                    label={currentUser.isAdmin ? 'Admin':'User'}
                    labelColor="dark"
                    active={tab === "profile"}

                >
                    Profile
                </SidebarItem>
                  {
                    currentUser.isAdmin && (
                      <Link to="/dashboard?tab=posts">
                        <SidebarItem
                         active={tab === "posts"}
                         icon={HiDocumentText}
                         as='div'
                        >
                          Posts  
                        </SidebarItem>
                      </Link>
                    )
                  }
                  {
                    currentUser.isAdmin && (
                        <Link to="/dashboard?tab=users">
                        <SidebarItem
                         active={tab === "users"}
                         icon={HiOutlineUserGroup}
                         as='div'
                        >
                          Users  
                        </SidebarItem>
                      </Link>
                    )
                  }
                  {
                    currentUser.isAdmin && (
                        <Link to="/dashboard?tab=comments">
                        <SidebarItem
                         active={tab === "comments"}
                         icon={HiAnnotation}
                         as='div'
                        >
                          Commentaires 
                        </SidebarItem>
                      </Link>
                    )
                  }
                
                
                
                
                <SidebarItem
                    icon={HiArrowSmRight}
                    className="cursor-pointer"
                    onClick={handleSignOut}
                >
                    Déconnexion
                </SidebarItem>
            </SidebarItemGroup>
        </Sidebar>
  );
}


