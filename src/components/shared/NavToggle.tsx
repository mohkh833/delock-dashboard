import { LiSidebarLeft, LiSidebarRight } from '@/icons'
import { LuAlignLeft, LuAlignRight } from 'react-icons/lu'
import { useLocale } from 'next-intl'
import type { CommonProps } from '@/@types/common'

export interface NavToggleProps extends CommonProps {
    toggled?: boolean
    iconType?: 'sidebar' | 'alignment'
}

const NavToggle = ({
    toggled,
    className,
    iconType = 'sidebar',
}: NavToggleProps) => {
    const locale = useLocale()
    const isRtl = locale === 'ar'

    const icons =
        iconType === 'alignment'
            ? {
                  left: <LuAlignLeft />,
                  right: <LuAlignRight />,
              }
            : {
                  left: <LiSidebarLeft />,
                  right: <LiSidebarRight />,
              }

    const activeIcon = isRtl
        ? toggled ? icons.left : icons.right
        : toggled ? icons.right : icons.left

    return <div className={className}>{activeIcon}</div>
}

export default NavToggle
