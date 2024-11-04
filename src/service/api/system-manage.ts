import { request } from '../request';

/** get role list */
export function fetchGetRoleList(params?: Api.SystemManage.RoleSearchParams) {
  return request<Api.SystemManage.RoleList>({
    url: '/role',
    method: 'get',
    params
  });
}

/**
 * get all roles
 *
 * these roles are all enabled
 */
export function fetchGetAllRoles() {
  return request<Api.SystemManage.AllRole[]>({
    url: '/systemManage/getAllRoles',
    method: 'get'
  });
}

/** get user list */
export function fetchGetUserList(params?: Api.SystemManage.UserSearchParams) {
  return request<Api.SystemManage.UserList>({
    url: '/user',
    method: 'get',
    params
  });
}

/** get menu list */
export const fetchGetMenuList = () =>
  request<Api.SystemManage.Menu[]>({
    url: '/route',
    method: 'get'
  })
    .then(response => {
      const menus = response.data || [];
      return {
        data: {
          records: menus,
          total: menus.length,
          current: 1,
          size: menus.length
        },
        error: null
      };
    })
    .catch(error => {
      return {
        data: null,
        error: error.message
      };
    });

/** get all pages */
export function fetchGetAllPages() {
  return request<string[]>({
    url: '/systemManage/getAllPages',
    method: 'get'
  });
}

/** get menu tree */
export function fetchGetMenuTree() {
  return request<Api.SystemManage.Menu[]>({
    url: '/route/tree',
    method: 'get'
  });
}

export type RoleModel = Pick<Api.SystemManage.Role, 'name' | 'code' | 'remark' | 'status' | 'order'>;

/**
 * 创建角色
 *
 * @param req 角色实体
 * @returns nothing
 */
export function createRole(req: RoleModel) {
  return request({
    url: '/role',
    method: 'post',
    data: req
  });
}

/**
 * 更新角色
 *
 * @param req 角色实体
 * @returns nothing
 */
export function updateRole(req: RoleModel) {
  return request({
    url: '/role',
    method: 'put',
    data: req
  });
}

/**
 * 删除角色
 *
 * @param id 删除ID
 * @returns nothing
 */
export function deleteRole(id: string) {
  return request({
    url: '/role',
    method: 'delete',
    data: [id]
  });
}

/**
 * 获取角色对应菜单数组集合
 *
 * @param roleId 角色ID
 * @returns 菜单数组集合
 */
export function fetchGetRoleMenuIds(roleId: string) {
  return request<string[]>({
    url: `/route/listMenuIdByRoleId/${roleId}`,
    method: 'get'
  });
}

/**
 * 角色授权菜单
 *
 * @param req 授权角色菜单实体
 * @returns nothing
 */
export function fetchAssignRoutes(req: Api.SystemManage.RoleMenu) {
  return request<boolean>({
    url: '/permission/authRoleMenu',
    method: 'post',
    data: req
  });
}

/**
 * 角色授权API
 *
 * @param req 授权角色API实体
 * @returns nothing
 */
export function fetchAssignPermission(req: Api.SystemManage.RolePermission) {
  return request<boolean>({
    url: '/permission/authRoleOperation',
    method: 'post',
    data: req
  });
}

export type RouteModel = Pick<
  Api.SystemManage.Menu,
  | 'menuType'
  | 'menuName'
  | 'routeName'
  | 'routePath'
  | 'component'
  | 'order'
  | 'i18nKey'
  | 'icon'
  | 'iconType'
  | 'status'
  | 'pid'
  | 'keepAlive'
  | 'constant'
  | 'href'
  | 'hideInMenu'
  | 'activeMenu'
  | 'multiTab'
  | 'fixedIndexInTab'
>;

/**
 * 创建路由
 *
 * @param req 路由实体
 * @returns nothing
 */
export function createRoute(req: RouteModel) {
  return request({
    url: '/route',
    method: 'post',
    data: req
  });
}

/**
 * 更新路由
 *
 * @param req 路由实体
 * @returns nothing
 */
export function updateRoute(req: RouteModel) {
  return request({
    url: '/route',
    method: 'put',
    data: req
  });
}

/**
 * 删除路由
 *
 * @param id 路由ID
 * @returns nothing
 */
export function deleteRoute(id: string) {
  return request({
    url: '/route',
    method: 'delete',
    data: [id]
  });
}

export type UserModel = Pick<
  Api.SystemManage.User,
  | 'accountName'
  | 'accountPassword'
  | 'avatar'
  | 'nickName'
  | 'phoneNumber'
  | 'email'
  | 'status'
  | 'personalProfile'
  | 'countryCode'
  | 'phoneCode'
  | 'gender'
>;

/**
 * 创建用户
 *
 * @param req 用户实体
 * @returns nothing
 */
export function createUser(req: UserModel) {
  return request({
    url: '/user',
    method: 'post',
    data: req
  });
}

/**
 * 更新用户
 *
 * @param req 用户实体
 * @returns nothing
 */
export function updateUser(req: UserModel) {
  return request({
    url: '/user',
    method: 'put',
    data: req
  });
}

/**
 * 删除用户
 *
 * @param id 删除ID
 * @returns nothing
 */
export function deleteUser(id: string) {
  return request({
    url: '/user',
    method: 'delete',
    data: [id]
  });
}

/** get api-endpoint tree */
export function fetchGetApiEndpointTree() {
  return request<Api.SystemManage.ApiEndpoint[]>({
    url: '/api',
    method: 'get'
  });
}

/**
 * 获取角色对应API数组集合
 *
 * @param roleCode 角色code
 * @returns API数组集合
 */
export function fetchGetRoleApiEndpoints(roleId: string) {
  return request<string[]>({
    url: `/api/listApiOperationIdByRoleId/${roleId}`,
    method: 'get'
  });
}
