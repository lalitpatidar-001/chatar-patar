import {
    User,
    Gear,
    SignOut
} from 'phosphor-react';
export const profile_menu_options=[
    {
        title:"Profile",
        icon:<User/>,
        path:"/profile"
    },
    {
        title:"Settings",
        icon:<Gear/>
    },
    {
        title:"Logout",
        icon:<SignOut/>,
    },
]