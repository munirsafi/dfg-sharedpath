import React from 'react';

import './Sidebar.scss';

export default function Sidebar(props: any) {

    const hideSidebar = () => {
        const sideBar = document.querySelector('.sidebar') as HTMLElement;
        sideBar.style.display = 'none';
    };

    const communitiesHash: any = {};
    const communities: any[] = [];

    for(let zone of props.zones) {
        if (communitiesHash[zone.communityInfo.community] === undefined) {
            communitiesHash[zone.communityInfo.community] = true;

            communities.push(zone.communityInfo);
        }
    }

    return (
        <div className='sidebar'>
            <div className='close-sidebar' onClick={() => hideSidebar()}></div>
            <div className='sidebar-title'>Ontario Native Groups</div>
            {communities.map((communityInfo: any, index: number) => {
                return (<div className='community-info' key={index}>
                    <span className='name'>{communityInfo.community}</span>
                    { communityInfo.community_email ?
                        <span>Email Address: <a href={'mailto:' + communityInfo.community_email}>{communityInfo.community_email}</a></span>
                        : null}
                    { communityInfo.community_phone ?
                        <span>Phone Number: < a href={'tel:' + communityInfo.community_phone}>{communityInfo.community_phone}</a></span>
                        : null}
                    { communityInfo.community_link ?
                        <span>Policy Link: <a href={communityInfo.community_link}>{communityInfo.community_link}</a></span>
                        : null}
                </div>);
            })}
        </div>
    );
}
