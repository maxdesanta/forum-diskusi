import React from 'react'
import Menu from '../menu';

export default function Footer() {
    return (
        <footer className="bg-btn w-full p-5">
            {/* menu group */}
            <div className="flex justify-center items-center h-full gap-8">
                {/* thread */}
                <Menu IconName="majesticons:comments-2-line" text="Threads" url={'/'} />
                {/* add */}
                <Menu IconName="gridicons:add-outline" text="Add Thread" url={'/add'} />
                {/* laderboard */}
                <Menu IconName="nimbus:stats" text="Laderboards" url={'/laderboard'} />
            </div>
        </footer>
    )
}
