import { MENU } from "../models/menu.model";

export const sideMenu: MENU[] = [
    {
        title: 'Role & Permission',
        icon: 'vpn_key',
        children: [
          {
            title: 'Create',
            url: '/permission/create'
          }
        ]
    },

    /**
     * Developer - Name
     * Feature - Department, 
     */
    {
      title: 'Department',
      icon: 'groups',
      children: [
        {
          title: 'Create',
          url: '/department/create'
        },
        {
          title: 'Department List',
          url: '/department/department'
        }
      ]
    },
    {
      title: 'Channel',
      icon:'view_stream',
      children:[
        {
          title: 'Create',
          url: '/channel/create'
        },
        {
          title: 'Channel List',
          url: '/channel/channelList'
        }
      ]
    },
    {
      title: 'Status Group',
      icon: '',
      children: [
        {
          title: 'Create',
          url: '/statusgroup/create'
        },
        {
          title: 'Status Group List',
          url: '/statusgroup/statusgroupList'
        }
      ]
    }
]