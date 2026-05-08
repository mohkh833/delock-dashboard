'use client'

import ActivityHeader from './ActivityHeader'
import ActivityContent from './ActivityContent'

const ContentZone = () => {
    return (
        <div className="flex flex-col flex-1 overflow-hidden">
            <ActivityHeader />
            <ActivityContent />
        </div>
    )
}

export default ContentZone
