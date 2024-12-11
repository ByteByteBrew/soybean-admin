<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import dayjs from 'dayjs';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';
import { enableStatusOptions } from '@/constants/business';
import type { TenantModel } from '@/service/api';
import { createTenant, updateTenant } from '@/service/api';

defineOptions({
  name: 'TenantOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.SystemManage.Tenant | null;
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
    add: '添加租户',
    edit: '编辑租户'
  };
  return titles[props.operateType];
});

const model: TenantModel = reactive(createDefaultModel());
const expireTimeValue = ref<number | null>(null);

function createDefaultModel(): TenantModel {
  return {
    name: '',
    contactUserId: '',
    contactAccountName: '',
    status: null,
    website: '',
    builtIn: false,
    expireTime: '',
    menuIds: [],
    operationIds: []
  };
}

type RuleKey = Extract<keyof TenantModel, 'name' | 'contactAccountName' | 'status' | 'expireTime'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  name: defaultRequiredRule,
  contactAccountName: defaultRequiredRule,
  status: defaultRequiredRule,
  expireTime: defaultRequiredRule
};

function handleInitModel() {
  Object.assign(model, createDefaultModel());

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, props.rowData);
    if (model.expireTime) {
      expireTimeValue.value = dayjs(model.expireTime).valueOf();
    }
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  if (expireTimeValue.value) {
    model.expireTime = dayjs(expireTimeValue.value).format('YYYY-MM-DDTHH:mm:ss');
  }

  await validate();

  if (props.operateType === 'add') {
    const { error } = await createTenant(model);
    if (error) return;
    window.$message?.success($t('common.addSuccess'));
  } else {
    const { error } = await updateTenant(model);
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
  }
});
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="360">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem label="租户名称" path="name">
          <NInput v-model:value="model.name" placeholder="请输入租户名称" />
        </NFormItem>
        <NFormItem label="联系人账号" path="contactAccountName">
          <NInput v-model:value="model.contactAccountName" placeholder="请输入联系人账号" />
        </NFormItem>
        <NFormItem label="网站" path="website">
          <NInput v-model:value="model.website" placeholder="请输入网站" />
        </NFormItem>
        <NFormItem label="状态" path="status">
          <NRadioGroup v-model:value="model.status">
            <NRadio v-for="item in enableStatusOptions" :key="item.value" :value="item.value" :label="$t(item.label)" />
          </NRadioGroup>
        </NFormItem>
        <NFormItem label="到期时间" path="expireTime">
          <NDatePicker v-model:value="expireTimeValue" type="datetime" placeholder="请选择到期时间" clearable />
        </NFormItem>
        <NFormItem label="菜单权限" path="menuIds">
          <NSelect v-model:value="model.menuIds" multiple placeholder="请选择菜单权限" />
        </NFormItem>
        <NFormItem label="操作权限" path="operationIds">
          <NSelect v-model:value="model.operationIds" multiple placeholder="请选择操作权限" />
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
