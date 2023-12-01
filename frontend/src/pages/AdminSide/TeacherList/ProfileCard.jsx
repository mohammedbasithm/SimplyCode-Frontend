import React from 'react'
import AdminNav from '../../../Component/Navbar/AdminNav'

const ProfileCard = () => {
  return (
    <div className="absolute w-screen h-screen bg-[#19A1AE]">
      <AdminNav/>
    
    <div className='absolute flex w-screen h-screen'>
        <div className='w-[326px] h-[374px] bg-white mx-auto my-auto rounded-2xl overflow-hidden'>
            <div className=''>
            <img className='top-0 z-10' src='https://raw.githubusercontent.com/Kasirocswell/profile-card/1d56eb242489ec3e26b288a3bf6744f6561eb2a9/src/Components/images/bg-pattern-card.svg' alt=''></img>
            </div>
            <div className='relative'>
            <img className='z-0 mx-auto mt-[-45px] rounded-full border-[5px] border-white' src='https://github.com/Kasirocswell/profile-card/blob/master/src/Components/images/image-victor.jpg?raw=true' alt=''></img>
            </div>
            <div className='flex-col'>
                <h2 className='text-center text-[18px] font-main font-bold mt-[12px]'>Victor Crest <span className='font-light text-[#6B7082] ml-2'>26</span></h2>
                <h2 className='text-center font-main text-[14px] mt-[12px]'>London</h2>
                <div className='border mt-[40px]'></div>
                <div className='flex flex-row'>
                    <div className='flex-col'>
                        <p className='text-[#2E3349] text-[18px] font-main font-bold text-center ml-[41px] mt-[12px]'>80K</p>
                        <p className='text-[10px] text-[#6B7082] font-main ml-[41px]'>Followers</p>
                    </div>
                    <div className='flex-col'>
                        <p className='text-[#2E3349] text-[18px] font-main font-bold text-center ml-[61px] mt-[12px]'>803K</p>
                        <p className='text-[10px] text-[#6B7082] font-main ml-[70px]'>Likes</p>
                    </div>
                    <div className='flex-col'>
                        <p className='text-[#2E3349] text-[18px] font-main font-bold text-center ml-[55px] mt-[12px]'>1.4K</p>
                        <p className='text-[10px] text-[#6B7082] font-main ml-[57px]'>Photos</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default ProfileCard
