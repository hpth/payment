const storageUtils = {
  /**
   * 1.设置sessionStorage
   * @key  @value
   * */
  setSessionStorage(key, value) {
    window.sessionStorage.setItem(''+key, value)
  },
  /****
   * 获取sessionStorage的值
   * @key
   */
  getSessionStorage(key) {
    return window.sessionStorage.getItem(''+key)
  },
  /**
   * 删除sessionStorage
   * @param key
   */
  removeSessionStorage(key) {
    window.sessionStorage.removeItem(''+key)
  }, 

  /**
   * 2.设置localStorage
   * @key  @value
   * */
  setLocalStorage(key, value) {
    window.localStorage.setItem(''+key, value)
  },
  /****
   * 获取localStorage的值
   * @key
   */
  getLocalStorage(key) {
    return window.localStorage.getItem(''+key)
  },
  /**
   * 删除localStorage
   * @param key
   */
  removeLocalStorage(key) {
    window.localStorage.removeItem(''+key)
  }, 
  /**
   * 删除所有localStorage
   * @param key
   */
  removeLocalStorageAll(){
    let pre=''    
    let arr=[]
    for(let key in localStorage){
      if(key.includes(pre)){
        arr.push(key)
      }
    }  
    arr.forEach(item=>{
      localStorage.removeItem(item)
    })
  },
}
