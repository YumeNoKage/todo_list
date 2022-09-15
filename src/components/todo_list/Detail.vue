<style>
    .custome-checkbox {
        width: 20px; 
        height: 20px;
    }

    .custome-checkbox:checked {
        background-color: var(--custome-blue-shoft) !important;
        border-color: var(--custome-blue-shoft) !important;
    }
</style>
<template>
    <div class="row">
        <div class="col-12 mt-5 pt-3" v-if="isLoading" data-cy="todo-loading">
            <Loading />
        </div>
        <div class="col-12 d-flex justify-content-center mt-5 pt-3" v-if="data && data.todo_items.length == 0 && !isLoading">
            <img src="../../assets/illustration/todo-empty-state.svg" max-width="541" alt="todo empty state" data-cy="todo-empty-state">
        </div>
        <div class="col-12 mt-5 pt-3" v-else-if="data && data.todo_items.length > 0 && !isLoading">
            <div class="row">
                <div class="col-12 mb-4 position-relative" v-for="(item, index) in data.todo_items" :key="index" >
                    <div class="card border-0 custome-box-shadow rounded-12 text-decoration-none text-custome-black" :data-cy="`todo-item-${index}`">
                        <div class="card-body d-flex align-items-center" style="min-height: 80px;">
                            <div class="d-flex justify-content-center ms-2">
                                <input class="form-check-input mt-0 custome-checkbox cursor-pointed" type="checkbox" :value="item.is_active" :checked="!item.is_active" @change="item.is_active = item.is_active ? 0 : 1; updateTodo(`todo-items/${item.id}`, {is_active: item.is_active, activity_group_id: item.activity_group_id})" aria-label="Checkbox for following text input" data-cy="todo-item-checkbox">
                            </div>
                            <div style="width: 14px; height: 14px; transform: translatey(-50%)" :class="`rounded-circle bg-custome-${getPriority(item.priority, null).color} position-absolute top-50 ms-5`" data-cy="todo-item-priority-indicator"></div>
                            <h5 :class="`card-title font-18 fw-custome-500 w-100 mb-0 ms-5 ps-2 ${item.is_active == 0 ? 'text-custome-gray-medium' : 'text-custome-black'}`" data-cy="activity-item-title">
                                <s v-if="item.is_active == 0" data-cy="todo-item-title">{{item.title}}</s >
                                <span v-else data-cy="todo-item-title">{{item.title}}</span>
                                <span>
                                    <button class="btn bg-transparent border-0" data-cy="todo-item-edit-button" @click="actionToEdit(item)">
                                        <img class="ms-3" src="../../assets/icons/pencil.svg" alt="edit">
                                    </button>
                                </span>
                            </h5>
                            <button class="p-0 border-0 bg-transparent mx-4" data-bs-target="#deleteTodo" data-bs-toggle="modal" @click="idTodo = item.id, todoName = item.title" data-cy="todo-item-delete-button">
                                <img src="../../assets/icons/trash.svg" alt="delete" width="24">
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <!-- modal delete activity -->
    <div class="modal fade" id="deleteTodo" tabindex="-1" data-bs-backdrop="static" :aria-labelledby="`deleteTodoLabel`" aria-hidden="true" data-cy="modal-delete">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content rounded-12 border-0">
                <div class="modal-body border-0">
                    <div class="pt-4">
                        <img class="mx-auto d-block" src="../../assets/icons/warning.svg" alt="warning" width="84" data-cy="modal-delete-icon">
                    </div>
                    <div class="desc text-center my-4" data-cy="modal-delete-title">
                        <span class="font-18 fw-custome-500 text-custome-black">
                            Apakah anda yakin menghapus List Item
                        </span> 
                        <br>
                        <span class="font-18 fw-custome-700 text-custome-black">
                            “{{todoName}}”?
                        </span>
                    </div>
                </div>
                <div class="modal-footer justify-content-center border-0">
                    <button type="button" class="btn bg-custome-gray-shoft rounded-pill px-4 font-18 text-custome-gray-strong fw-custome-600" id="closeModalDelete" data-bs-dismiss="modal" data-cy="modal-delete-cancel-button">Close</button>
                    <button type="button" class="btn bg-custome-red rounded-pill px-4 font-18 text-white fw-custome-600" @click="deleteTodo(`todo-items/${idTodo}`)" data-cy="modal-delete-confirm-button">Hapus</button>
                </div>
            </div>
        </div>
    </div>

    <!-- modal information -->
    <div class="modal fade" id="deleteTodoNotif" tabindex="-1" aria-labelledby="deleteTodoNotifLabel" aria-hidden="true" data-cy="modal-information">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content rounded-12 border-0">
                <div class="modal-body border-0">
                    <div class="desc text-left">
                        <span class="font-14 fw-custome-500 text-custome-black">
                            <img src="../../assets/icons/info.svg" class="to-red">
                            Todo berhasil dihapus
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        props:{
            showLoading: {default: false},
            dataParent: {default: null}
        },
        data(){
            return{
                data: this.dataParent,
                isLoading: this.showLoading,
                idTodo: null,
                todoName: null,
            }
        },

        emits:['editData', 'update:Parent'],
        
        methods: {
            ...mapActions({
                getData: 'getData',
                deleteData: 'deleteData',
                updateData: 'updateData'
            }),

            async deleteTodo(url, params){
                this.isLoading = true

                let data = {url, params}
                const response = await this.deleteData(data)

                if (response.status == 200) {
                    $('#deleteTodo').modal('hide')
                    $('#deleteTodoNotif').modal('show')

                    setTimeout(() =>{console.log('jalan'), $('#deleteTodoNotif').modal('hide')},2000)
                    this.updateParent()
                }
            },

            async updateTodo(url, params){
                this.isLoading = true

                let data = {url, params}
                const response = await this.updateData(data)

                if (response.status == 200) { this.updateParent() }
            },

            
            updateParent(){
                this.$emit('update:Parent')
            },

            actionToEdit(data){
                this.$emit('editData', data)
            }
        },
    }
</script>