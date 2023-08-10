export interface Note {
  // 便签id
  id: number
  // 便签标题
  title: string
  // 内容
  content: string
  // 生成时间
  createTime: number
  // 是否展示在主页
  show: boolean
}

export interface MainState {
  notes: Note[]
}
