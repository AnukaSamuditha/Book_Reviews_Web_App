import { NavLink, Outlet, useOutletContext } from "react-router-dom";

export default function DashboardHome(){
    
    const {user,setUser}=useOutletContext();

    return(
        <div className="w-full h-auto">
            <div className="w-full h-[3rem] p-4 lg:ml-3 flex justify-start items-center gap-8  ">
                <NavLink to='.' className={({isActive})=>isActive ? 'font-medium text-[#ec4e39]' : 'font-medium text-black'} end>Reviews</NavLink>
                <NavLink to='publish-review' className={({isActive})=>isActive ? 'font-medium text-[#ec4e39]' : 'font-medium text-black'}  >Publish</NavLink>
            </div>
            <hr className="w-[90%] h-[2px] bg-gray-400 ml-7"/>
            <div className="w-full h-auto">
             <Outlet context={{user,setUser}}/>
            </div>
        </div>
    )
}