<template>
  <div class="w-3/4 mx-auto mt-60px mb-60px">
    <n-card class="mb-30px">
      <n-tabs default-value="input" size="large" justify-content="space-evenly">
        <n-tab-pane name="input" tab="在线输入">
          <n-form :model="model" class="mb-10px">
            <n-dynamic-input
              v-model:value="model.dynamicInputValue"
              item-style="margin-bottom: 0;"
              :on-create="onCreate"
              #="{ index, value }"
            >
              <div style="display: flex">
                <div
                  style="height: 34px; line-height: 34px; margin: 0 8px"
                  class="w-40px"
                >
                  姓名:
                </div>
                <n-form-item
                  ignore-path-change
                  :show-label="false"
                  :path="`dynamicInputValue[${index}].name`"
                  :rule="nameInputRule"
                >
                  <n-input
                    v-model:value="model.dynamicInputValue[index].name"
                    placeholder="姓名"
                    @keydown.enter.prevent
                  />
                </n-form-item>
                <div
                  style="height: 34px; line-height: 34px; margin: 0 8px"
                  class="w-40px"
                >
                  学号:
                </div>
                <n-form-item
                  ignore-path-change
                  :show-label="false"
                  :path="`dynamicInputValue[${index}].id`"
                  :rule="idInputRule"
                >
                  <n-input
                    v-model:value="model.dynamicInputValue[index].id"
                    placeholder="学号"
                    @keydown.enter.prevent
                  />
                </n-form-item>
                <div
                  style="height: 34px; line-height: 34px; margin: 0 8px"
                  class="w-40px"
                >
                  部门:
                </div>
                <n-form-item
                  ignore-path-change
                  :show-label="false"
                  :path="`dynamicInputValue[${index}].department`"
                  :rule="departmentInputRule"
                >
                  <n-input
                    v-model:value="model.dynamicInputValue[index].department"
                    placeholder="部门"
                    @keydown.enter.prevent
                  />
                </n-form-item>
                <div
                  style="height: 34px; line-height: 34px; margin: 0 8px"
                  class="w-40px"
                >
                  年级:
                </div>
                <n-select
                  v-model:value="model.dynamicInputValue[index].grade"
                  :options="options"
                  class="w-200px"
                />
              </div>
            </n-dynamic-input>
          </n-form>
          <n-button @click="clearInput" class="mr-20px">清空输入</n-button>
          <n-button @click="showModal" class="mr-20px"> 生成预览 </n-button>
          <n-button @click="renderPDF">生成PDF</n-button>
          <n-modal
            v-model:show="showModalValue"
            class="custom-card my-60px"
            preset="card"
            :style="bodyStyle"
            title="预览"
            size="huge"
            :bordered="false"
            :segmented="segmented"
          >
            <div id="pdfDom">
              <Card
                :name="item.name"
                :grade="item.grade"
                :department="item.department"
                :id="item.id"
                v-for="(item, index) of model.dynamicInputValue"
                :key="index"
                class="my-20px mx-auto get"
                :class="{ breakPage: index % 2 == 1 }"
              ></Card>
            </div>
            <n-button v-print="'#pdfDom'">打印</n-button>
          </n-modal>
        </n-tab-pane>
        <n-tab-pane name="import" tab="批量导入">
          <n-button @click="downloadFile" class="mb-10px"
            >下载上传模板</n-button
          >
          <n-upload
            action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
            @before-upload="beforeUpload"
            class="mx-auto w-500px mb-30px"
          >
            <n-upload-dragger>
              <div style="margin-bottom: 12px">
                <n-icon size="48" :depth="3">
                  <archive-icon />
                </n-icon>
              </div>
              <n-text style="font-size: 16px">
                点击或者拖动文件到该区域来上传
              </n-text>
              <n-p depth="3" style="margin: 8px 0 0 0">
                请上传xlsx/xls/csv格式文件
                csv格式文件请上传编码为“带BOM的UTF-8”的文件
              </n-p>
            </n-upload-dragger>
          </n-upload>
          <n-form :model="uploadModel">
            <n-dynamic-input
              v-model:value="uploadModel.dynamicInputValue"
              item-style="margin-bottom: 0;"
              :on-create="onCreate"
              #="{ index, value }"
            >
              <div style="display: flex">
                <div
                  style="height: 34px; line-height: 34px; margin: 0 8px"
                  class="w-40px"
                >
                  姓名:
                </div>
                <n-form-item
                  ignore-path-change
                  :show-label="false"
                  :path="`dynamicInputValue[${index}].name`"
                  :rule="nameInputRule"
                >
                  <n-input
                    v-model:value="uploadModel.dynamicInputValue[index].name"
                    placeholder="姓名"
                    @keydown.enter.prevent
                  />
                </n-form-item>
                <div
                  style="height: 34px; line-height: 34px; margin: 0 8px"
                  class="w-40px"
                >
                  学号:
                </div>
                <n-form-item
                  ignore-path-change
                  :show-label="false"
                  :path="`dynamicInputValue[${index}].id`"
                  :rule="idInputRule"
                >
                  <n-input
                    v-model:value="uploadModel.dynamicInputValue[index].id"
                    placeholder="学号"
                    @keydown.enter.prevent
                  />
                </n-form-item>
                <div
                  style="height: 34px; line-height: 34px; margin: 0 8px"
                  class="w-40px"
                >
                  部门:
                </div>
                <n-form-item
                  ignore-path-change
                  :show-label="false"
                  :path="`dynamicInputValue[${index}].department`"
                  :rule="departmentInputRule"
                >
                  <n-input
                    v-model:value="
                      uploadModel.dynamicInputValue[index].department
                    "
                    placeholder="部门"
                    @keydown.enter.prevent
                  />
                </n-form-item>
                <div
                  style="height: 34px; line-height: 34px; margin: 0 8px"
                  class="w-40px"
                >
                  年级:
                </div>
                <n-select
                  v-model:value="uploadModel.dynamicInputValue[index].grade"
                  :options="options"
                  class="w-200px"
                />
              </div>
            </n-dynamic-input>
          </n-form>
          <n-button @click="clearUploadInput" class="mr-20px">清空输入</n-button>
          <n-button @click="uploadShowModal" class="mt-5px mr-20px">
            生成预览
          </n-button>
          <n-button @click="uploadRenderPDF"> 生成PDF </n-button>
          <n-modal
            v-model:show="uploadShowModalValue"
            class="custom-card my-60px"
            preset="card"
            :style="bodyStyle"
            title="预览"
            size="huge"
            :bordered="false"
            :segmented="segmented"
          >
            <div id="uploadPdfDom">
              <Card
                :name="item.name"
                :grade="item.grade"
                :department="item.department"
                :id="item.id"
                v-for="(item, index) of uploadModel.dynamicInputValue"
                :key="index"
                class="my-30px mx-auto get"
                :class="{ breakPage: index % 2 == 1 }"
              ></Card>
            </div>
            <n-button v-print="'#uploadPdfDom'">打印</n-button>
          </n-modal>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
import Vue, { onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue'
import {
  NForm,
  NDynamicInput,
  NFormItem,
  NInput,
  NButton,
  NSelect,
  NTabPane,
  NTabs,
  NCard,
  NUpload,
  NUploadDragger,
  NP,
  NText,
  NIcon,
  UploadFileInfo,
  useMessage,
  FormItemInst,
  NModal,
} from 'naive-ui'
import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5'
import * as XLSX from 'xlsx/xlsx.mjs'
import Card from '@/components/Card.vue'
import { getPdf } from '@/tools/htmlToPdf'
import printJS from 'print-js'
import { WorkSheet } from 'xlsx'
import { useStore } from 'vuex'

const store = useStore()

const downloadFile = () => {
  let excel = [
    ['姓名', '学号', '部门', '年级'],
    ['朱子键', '2201110533', '事务部/本科', '本科'],
  ]
  let worksheet: WorkSheet = XLSX.utils.aoa_to_sheet(excel)
  let workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, '第一页')
  XLSX.writeFile(workbook, '数据.xlsx')
}

//输入模块--------------START
//对各个输入框进行验证----
const nameInputRule = {
  trigger: ['input', 'blur'],
  required: true,
  validator(rule: unknown, value: string) {
    if (value.length >= 8 || value.length < 2)
      return new Error('最多输入八个字符,最少输入两个字符')
    if (!/^[\u4e00-\u9fa5]+$/.test(value)) return new Error('只能输入中文')
    return true
  },
}

const idInputRule = {
  trigger: ['input', 'blur'],
  required: true,
  validator(rule: unknown, value: string) {
    if (!/^[1-3][0-9]+$/.test(value) || value.length !== 10)
      return new Error('请输入正确的学号')
    return true
  },
}

const departmentInputRule = {
  trigger: ['input', 'blur'],
  required: true,
  validator(rule: unknown, value: string) {
    if (value !== '事务部' && value !== '研发部')
      return new Error('请输入正确的部门')
  },
}
//表单验证完成-----

//表单属性------

const model = ref({
  dynamicInputValue: [{ id: '', name: '', department: '', grade: '' }],
})


const onCreate = () => {
  return {
    name: '',
    id: '',
    department: '',
    grade: '',
  }
}
const options = [
  {
    label: '本科',
    value: '本科',
  },
  {
    label: '硕士',
    value: '硕士',
  },
  {
    label: '博士',
    value: '博士',
  },
]

const clearInput = () => {
  model.value.dynamicInputValue = []
}
//---------
//-------------END

//批量导入模块---------START
//文件读取函数
const message = useMessage()
const selectFile: any = ref(null)

const beforeUpload = async (data: {
  file: UploadFileInfo
  fileList: UploadFileInfo[]
}) => {
  selectFile.value = data.file.file
  if (
    data.file.file?.type !==
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
    data.file.file?.type !== 'application/vnd.ms-excel'
  ) {
    message.error('只能上传xls/xlsx/csv的文件 请重新上传')
  }
  const reader = new FileReader()
  reader.readAsBinaryString(selectFile.value)
  reader.onload = (e: any) => {
    const workbook = XLSX.read(e.target.result, {
      type: 'binary',
      cellDates: true,
    })
    let sheetList = workbook.SheetNames // 工作表名称集合
    sheetList.forEach((name: any) => {
      let worksheet = workbook.Sheets[name] // 只能通过工作表名称来获取指定工作表
      let results = XLSX.utils.sheet_to_json(worksheet) // XLSX解析工作表信息
      console.log(results)
      results.map(function (i: any, index: any) {
        //加入导入验证函数
        uploadArray.value.push({
          name: i.姓名,
          id: i.学号,
          department: i.部门,
          grade: i.年级,
        })
      })
      uploadArray.value = uploadValidateArray(uploadArray.value)
      console.log(uploadArray.value)
      if (!uploadFlag.value) {
        message.error('异常数据已清除！请重新输入！')
      }
      if (uploadArray.value.length == 0) {
        message.error('文件数据格式有问题！请重新上传！')
      } else {
        uploadModel.value.dynamicInputValue.push.apply(
          uploadModel.value.dynamicInputValue,
          uploadArray.value
        )
        uploadArray.value = []
        message.success('上传成功!')
      }
    })
  }
  return false
}

const uploadHandleValidateClick = () => {
  //上传总数组验证
  uploadModel.value.dynamicInputValue = uploadValidateArray(
    uploadModel.value.dynamicInputValue
  )
  if (uploadModel.value.dynamicInputValue.length == 0) {
    message.error('请输入正确用例！')
    uploadFlag.value = false
  }
}

const uploadValidateArray = (inputModel: any) => {
  uploadFlag.value = true
  for (let index = 0; index < inputModel.length; index++) {
    //用map方法会导致删除元素时 index 改变而跳过某些元素  因此此处采用for循环遍历
    let currentValue = inputModel[index]
    if (typeof currentValue.id == 'number')
      currentValue.id = currentValue.id.toString()
    if (
      !/^[1-3][0-9]+$/.test(currentValue.id) ||
      currentValue.id.length != 10
    ) {
      currentValue.id = ''
      uploadFlag.value = false
    }
    if (
      !/^[\u4e00-\u9fa5]+$/.test(currentValue.name) ||
      currentValue.name.length >= 8 ||
      currentValue.name.length < 2
    ) {
      currentValue.name = ''
      uploadFlag.value = false
    }
    if (
      currentValue.department != '事务部' &&
      currentValue.department != '研发部'
    ) {
      currentValue.department = ''
      uploadFlag.value = false
    }
    if (
      (currentValue.grade != '本科' &&
        currentValue.grade != '硕士' &&
        currentValue.grade != '博士') ||
      (!currentValue.id && !currentValue.name && !currentValue.department)
    ) {
      currentValue.grade = ''
      uploadFlag.value = false
    }
    if (
      currentValue.id == '' &&
      currentValue.name == '' &&
      currentValue.department == '' &&
      currentValue.grade == ''
    ) {
      inputModel.splice(index, 1)
      index = index - 1 //防止跳过元素
    }
  }
  return inputModel
}

const clearUploadInput = () => {
  uploadModel.value.dynamicInputValue = []
}
//---------

//导入后显示信息模块---------
const uploadArray: any = ref([]) //上传文件数组
const uploadModel: any = ref({
  //总数组
  dynamicInputValue: [],
})
//在线上传模块点击预览后验证表单数据合法性
const handleValidateClick = () => {
  for (let index = 0; index < model.value.dynamicInputValue.length; index++) {
    //用map方法会导致删除元素时 index 改变而跳过某些元素  因此此处采用for循环遍历
    let currentValue = model.value.dynamicInputValue[index]
    if (
      currentValue.id == '' &&
      currentValue.name == '' &&
      currentValue.department == '' &&
      currentValue.grade == ''
    ) {
      model.value.dynamicInputValue.splice(index, 1)
      index = index - 1 //防止跳过元素
    }
    if (
      !/^[1-3][0-9]+$/.test(currentValue.id) ||
      currentValue.id.length != 10 ||
      !/^[\u4e00-\u9fa5]+$/.test(currentValue.name) ||
      currentValue.name.length >= 8 ||
      currentValue.name.length < 2
    ) {
      flag.value = false
    }
    if (
      currentValue.department != '事务部' &&
      currentValue.department != '研发部'
    ) {
      flag.value = false
    }
    if (
      (currentValue.grade != '本科' &&
        currentValue.grade != '硕士' &&
        currentValue.grade != '博士') ||
      (!currentValue.id && !currentValue.name && !currentValue.department)
    ) {
      currentValue.grade = ''
      flag.value = false
    }
  }
  if (model.value.dynamicInputValue.length == 0) {
    message.error('请输入用例！')
    flag.value = false
  }
}
//----------

//批量上传模块验证------

//-------显示Card
const bodyStyle = {
  width: '950px',
}
const segmented = {
  content: 'soft',
  footer: 'soft',
}

const showModalValue = ref(false)
const flag = ref(true) //判断验证是否通过
const showModal = () => {
  flag.value = true
  handleValidateClick()
  if (flag.value) {
    showModalValue.value = true
  } else {
    message.error('数据输入错误！请重新输入！')
  }
}
const renderPDF = () => {
  showModal()
  setTimeout(() => {
    getPdf('pdfDom')
  }, 200) //等Dom结点渲染出来再调用函数 否则获取不到Dom结点
}

const uploadShowModalValue = ref(false)
const uploadFlag = ref(true)
const uploadShowModal = () => {
  uploadFlag.value = true
  uploadHandleValidateClick()
  if (uploadFlag.value) {
    uploadShowModalValue.value = true
  } else {
    message.error('数据输入错误！请重新输入！')
  }
}
const uploadRenderPDF = () => {
  uploadShowModal()
  setTimeout(() => {
    getPdf('uploadPdfDom')
  }, 200) //等Dom结点渲染出来再调用函数 否则获取不到Dom结点
}

onMounted(() => {
  model.value.dynamicInputValue = store.state.model
  uploadModel.value.dynamicInputValue = store.state.uploadModel
})

window.onbeforeunload = () => {
  //监听页面刷新与离开
  store.commit('setModel', model.value.dynamicInputValue)
  store.commit('setUploadModel', uploadModel.value.dynamicInputValue)
}
//---------
</script>

<style scoped>
.breakPage {
  page-break-after: always;
}
</style>
