<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';
import { enableStatusOptions } from '@/constants/business';
import type { UserModel } from '@/service/api';
import { createUser, updateUser } from '@/service/api';

defineOptions({
  name: 'UserOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.SystemManage.User | null;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: $t('page.manage.user.addUser'),
    edit: $t('page.manage.user.editUser')
  };
  return titles[props.operateType];
});

const model: UserModel = reactive(createDefaultModel());

function createDefaultModel(): UserModel {
  return {
    accountName: '',
    accountPassword: '',
    avatar: '',
    nickName: '',
    phoneNumber: '',
    email: '',
    status: null,
    personalProfile: '',
    countryCode: '',
    phoneCode: '',
    gender: ''
  };
}

type RuleKey = Extract<keyof UserModel, 'accountName' | 'status'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  accountName: defaultRequiredRule,
  status: defaultRequiredRule
};

/** the enabled role options */
// const roleOptions = ref<CommonType.Option<string>[]>([]);
//
// async function getRoleOptions() {
//   const { error, data } = await fetchGetAllRoles();
//
//   if (!error) {
//     const options = data.map(item => ({
//       label: item.roleName,
//       value: item.roleCode
//     }));
//
//     // the mock data does not have the roleCode, so fill it
//     // if the real request, remove the following code
//     const userRoleOptions = model.userRoles.map(item => ({
//       label: item,
//       value: item
//     }));
//     // end
//
//     roleOptions.value = [...userRoleOptions, ...options];
//   }
// }

function handleInitModel() {
  Object.assign(model, createDefaultModel());

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, props.rowData);
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();
  // request
  if (props.operateType === 'add') {
    const { error } = await createUser(model);
    if (error) return;
    window.$message?.success($t('common.addSuccess'));
  } else {
    const { error } = await updateUser(model);
    if (error) return;
    window.$message?.success($t('common.updateSuccess'));
  }
  closeDrawer();
  emit('submitted');
}

watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    restoreValidation();
    // getRoleOptions();
  }
});
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="360">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem :label="$t('page.manage.user.userName')" path="accountName">
          <NInput v-model:value="model.accountName" :placeholder="$t('page.manage.user.form.userName')" />
        </NFormItem>
        <NFormItem v-if="props.operateType === 'add'" label="password" path="accountPassword">
          <NInput v-model:value="model.accountPassword" :placeholder="$t('page.manage.user.form.password')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.user.nickName')" path="nickName">
          <NInput v-model:value="model.nickName" :placeholder="$t('page.manage.user.form.nickName')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.user.userPhone')" path="userPhone">
          <NInput v-model:value="model.phoneNumber" :placeholder="$t('page.manage.user.form.userPhone')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.user.userEmail')" path="email">
          <NInput v-model:value="model.email" :placeholder="$t('page.manage.user.form.userEmail')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.user.userStatus')" path="status">
          <NRadioGroup v-model:value="model.status">
            <NRadio v-for="item in enableStatusOptions" :key="item.value" :value="item.value" :label="$t(item.label)" />
          </NRadioGroup>
        </NFormItem>
        <NFormItem label="personalProfile" path="personalProfile">
          <NInput v-model:value="model.personalProfile" placeholder="personalProfile" />
        </NFormItem>
        <NFormItem label="countryCode" path="countryCode">
          <NInput v-model:value="model.countryCode" placeholder="countryCode" />
        </NFormItem>
        <NFormItem label="phoneCode" path="phoneCode">
          <NInput v-model:value="model.phoneCode" placeholder="phoneCode" />
        </NFormItem>
        <NFormItem label="gender" path="gender">
          <NInput v-model:value="model.gender" placeholder="gender" />
        </NFormItem>
      </NForm>
      <template #footer>
        <NSpace :size="16">
          <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
          <NButton type="primary" @click="handleSubmit">{{ $t('common.confirm') }}</NButton>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped></style>
