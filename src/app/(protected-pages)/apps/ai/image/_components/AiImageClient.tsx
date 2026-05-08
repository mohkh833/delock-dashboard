'use client'

import SettingPanel from './SettingPanel'
import PreviewZone from './PreviewZone'

const AiImageClient = () => {
    return (
        <div className="flex flex-auto gap-4 h-full">
            <SettingPanel />
            <PreviewZone />
        </div>
    )
}

export default AiImageClient
