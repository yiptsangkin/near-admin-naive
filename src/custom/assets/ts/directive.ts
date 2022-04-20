import csstore from '@csstore/index'
import costore from '@costore/index'

const csStore = csstore()
const coStore = costore()

export default {
    permit: {
        created (el, binding, vnode, prevVnode) {
            console.log(el)
        }
    }
}
