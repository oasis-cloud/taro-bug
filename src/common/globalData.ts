interface IDic {
  label: string;
  value: string;
}
class GlobalData {
  dic: IDic[] = []
}
export default new GlobalData()
