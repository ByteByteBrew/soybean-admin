/**
 * Namespace Api
 *
 * All backend api type
 */
declare namespace Api {
  namespace Common {
    /** common params of paginating */
    interface PaginatingCommonParams {
      /** current page number */
      current: number;
      /** page size */
      size: number;
      /** total count */
      total: number;
    }

    /** common params of paginating query list data */
    interface PaginatingQueryRecord<T = any> extends PaginatingCommonParams {
      records: T[];
    }

    /** common search params of table */
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'current' | 'size'>;

    /**
     * enable status
     *
     * - "ENABLED": enabled
     * - "DISABLED": disabled
     */
    type EnableStatus = 'ENABLED' | 'DISABLED';

    /** common record */
    type CommonRecord<T = any> = {
      /** record id */
      id: any;
      /** record creator */
      createBy: string;
      /** record create time */
      createTime: string;
      /** record updater */
      updateBy: string;
      /** record update time */
      updateTime: string;
      /** record status */
      status: EnableStatus | null;
    } & T;
  }

  /**
   * namespace Auth
   *
   * backend api module: "auth"
   */
  namespace Auth {
    interface LoginToken {
      token: string;
      refreshToken: string;
    }

    interface UserInfo {
      userId: string;
      userName: string;
      roles: string[];
      buttons: string[];
    }
  }

  /**
   * namespace Route
   *
   * backend api module: "route"
   */
  namespace Route {
    type ElegantConstRoute = import('@elegant-router/types').ElegantConstRoute;

    interface MenuRoute extends ElegantConstRoute {
      id: string;
    }

    interface UserRoute {
      routes: MenuRoute[];
      home: import('@elegant-router/types').LastLevelRouteKey;
    }
  }

  /**
   * namespace SystemManage
   *
   * backend api module: "systemManage"
   */
  namespace SystemManage {
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'current' | 'size'>;

    /** role */
    type Role = Common.CommonRecord<{
      /** role name */
      name: string;
      /** role code */
      code: string;
      /** role description */
      remark: string;
      order: number;
    }>;

    /** role menu */
    type RoleMenu = {
      roleId: string;
      menuIds: string[];
    };

    /** role menu */
    type RolePermission = {
      roleId: string;
      operationIds: string[];
    };

    /** role search params */
    type RoleSearchParams = CommonType.RecordNullable<
      Pick<Api.SystemManage.Role, 'name' | 'code' | 'status'> & CommonSearchParams
    >;

    /** role list */
    type RoleList = Common.PaginatingQueryRecord<Role>;

    /** all role */
    type AllRole = Pick<Role, 'id' | 'name' | 'code'>;

    /**
     * user gender
     *
     * - "1": "male"
     * - "2": "female"
     */
    type UserGender = '1' | '2';

    /** user */
    type User = Common.CommonRecord<{
      /** user name */
      accountName: string;
      /** password */
      accountPassword: string;
      /** avatar */
      avatar: string;
      /** user nick name */
      nickName: string;
      /** user phone */
      phoneNumber: string;
      /** user email */
      email: string;
      personalProfile: string;
      countryCode: string;
      phoneCode: string;
      gender: string;
    }>;

    /** user search params */
    type UserSearchParams = CommonType.RecordNullable<
      Pick<Api.SystemManage.User, 'accountName' | 'nickName' | 'phoneNumber' | 'email' | 'status'> & CommonSearchParams
    >;

    /** user list */
    type UserList = Common.PaginatingQueryRecord<User>;

    /**
     * menu type
     *
     * - "DIRECTORY": directory
     * - "MENU": menu
     */
    type MenuType = 'DIRECTORY' | 'MENU';

    type MenuButton = {
      /**
       * button code
       *
       * it can be used to control the button permission
       */
      code: string;
      /** button description */
      desc: string;
    };

    /**
     * icon type
     *
     * - "1": iconify icon
     * - "2": local icon
     */
    type IconType = '1' | '2';

    type MenuPropsOfRoute = Pick<
      import('vue-router').RouteMeta,
      | 'i18nKey'
      | 'keepAlive'
      | 'constant'
      | 'order'
      | 'href'
      | 'hideInMenu'
      | 'activeMenu'
      | 'multiTab'
      | 'fixedIndexInTab'
      | 'query'
    >;

    type Menu = Common.CommonRecord<{
      /** parent menu id */
      pid: number;
      /** menu type */
      menuType: MenuType;
      /** menu name */
      menuName: string;
      /** route name */
      routeName: string;
      /** route path */
      routePath: string;
      /** component */
      component?: string;
      /** iconify icon name or local icon name */
      icon: string;
      /** icon type */
      iconType: IconType;
      /** buttons */
      buttons?: MenuButton[] | null;
      /** children menu */
      children?: Menu[] | null;
    }> &
      MenuPropsOfRoute;

    /** menu list */
    type MenuList = Common.PaginatingQueryRecord<Menu>;

    type MenuTree = {
      id: number;
      label: string;
      pId: number;
      children?: MenuTree[];
    };

    type ApiEndpoint = {
      operationId: string;
      path: string;
      httpMethod: string;
      permissions: string;
      summary: string;
      description: string;
    };

    type Tenant = Common.CommonRecord<{
      /** 租户名称 */
      name: string;
      /** 租户联系人账号ID */
      contactUserId: string;
      /** 租户联系人账号名称 */
      contactAccountName: string;
      /** 租户域名网站 */
      website?: string;
      /** 是否内置 */
      builtIn: boolean;
      /** 租户过期时间 */
      expireTime: string;
      menuIds: string[];
      operationIds: string[];
    }>;

    type TenantSearchParams = CommonType.RecordNullable<
      Pick<Api.SystemManage.Tenant, 'name' | 'contactAccountName' | 'status'> & CommonSearchParams
    >;

    type TenantList = Common.PaginatingQueryRecord<Tenant>;
  }
}
