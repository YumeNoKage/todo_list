<style scoped>
    .border-top-12,
    .border-top-12:hover {
        border-radius: 12px 12px 0px 0px;
    }
    .border-bottom-12,
    .border-bottom-12:hover {
        border-radius: 0px 0px 12px 12px;
    }

    .input-dropdown:not(.show) .chevron img{
        transform: rotate(180deg) !important;
    }
    .input-dropdown.show .chevron img{
        transform: rotate(0deg) !important;
    }

</style>
<template>
    <div class="container py-5">
        <div class="row">
            <!-- loading animation -->
            <div class="col-12 mt-5 pt-3" v-if="isLoading && data == null" data-cy="activity-detail-loading">
                <Loading />
            </div>

            <!-- header -->
            <div class="col-12" v-if="data != null">
                <div class="d-flex justify-content-between">
                    <h1 data-cy="activity-title" class="font-custome-36 fw-custome-700">
                        <a href="/" class="border-0 text-decoration-none text-custome-black" data-cy="todo-back-button">
                            <img src="../assets/icons/back-left.svg" alt="back">
                        </a>
                        <input type="text" v-model="data.title" class="border-0 border-bottom fw-custome-700" @keypress.enter="editTitle ? (updateDetail(), editTitle = false) : null" @blur="editTitle ? (updateDetail(), editTitle = false) : null" style="outline: none;" v-if="editTitle" data-cy="todo-title">
                        <span v-else data-cy="todo-title">{{data.title}}</span>
                        <span class="ms-3">
                            <button class="bg-transparent border-0" @click="editTitle = !editTitle" data-cy="todo-title-edit-button">
                                <img width="24" src="../assets/icons/pencil.svg" alt="edit" v-if="!editTitle">
                                <img width="24" src="../assets/icons/close.svg" alt="edit" v-if="editTitle">
                            </button>
                        </span>
                    </h1>

                    <div class="dropdown">
                        <div class="d-flex position-relative col-lg-6 col-md-8 col-sm-8 input-dropdown" data-bs-toggle="dropdown" aria-expanded="false" data-cy="modal-add-priority-dropdown">
                            <span class="border rounded-circle">
                                <img class="p-3" src="../assets/icons/arrows-sort.svg" alt="sort">
                            </span>
                        </div>
                        <ul class="dropdown-menu py-0 rounded-12" style="min-width: 205px">
                            <li>
                                <div :class="`dropdown-item d-flex align-items-center justify-content-between py-3 border-bottom border-top-12`" @click="filter= 'latest'" data-cy="sort-latest">
                                    <div class="d-flex align-items-center">
                                        <span><img src="../assets/icons/arrow-sort-desc.svg" alt="sort desc"></span>
                                        <span class="ms-3">Terbaru</span>
                                    </div>
                                    <div v-if="filter == 'latest'">
                                        <img src="../assets/icons/check.svg" alt="checked">
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div :class="`dropdown-item d-flex align-items-center justify-content-between py-3 border-bottom`" @click="filter= 'oldest'" data-cy="sort-oldest">
                                    <div class="d-flex align-items-center">
                                        <span><img src="../assets/icons/arrow-sort-asc.svg" alt="sort asc"></span>
                                        <span class="ms-3">Terlama</span>
                                    </div>
                                    <div v-if="filter == 'oldest'">
                                        <img src="../assets/icons/check.svg" alt="checked">
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div :class="`dropdown-item d-flex align-items-center justify-content-between py-3 border-bottom`" @click="filter= 'az'" data-cy="sort-az">
                                    <div class="d-flex align-items-center">
                                        <span><img src="../assets/icons/arrow-sort-az.svg" alt="sort az"></span>
                                        <span class="ms-3">A-Z</span>
                                    </div>
                                    <div v-if="filter == 'az'">
                                        <img src="../assets/icons/check.svg" alt="checked">
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div :class="`dropdown-item d-flex align-items-center justify-content-between py-3 border-bottom`" @click="filter= 'za'" data-cy="sort-za">
                                    <div class="d-flex align-items-center">
                                        <span><img src="../assets/icons/arrow-sort-za.svg" alt="sort za"></span>
                                        <span class="ms-3">Z-A</span>
                                    </div>
                                    <div v-if="filter == 'za'">
                                        <img src="../assets/icons/check.svg" alt="checked">
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div :class="`dropdown-item d-flex align-items-center justify-content-between py-3 border-bottom border-bottom-12`" @click="filter= 'unfinished'" data-cy="sort-unfinished">
                                    <div class="d-flex align-items-center">
                                        <span><img src="../assets/icons/arrows-sort-unfinished.svg" alt="sort unfinished"></span>
                                        <span class="ms-3">Belum Selesai</span>
                                    </div>
                                    <div v-if="filter == 'unfinished'">
                                        <img src="../assets/icons/check.svg" alt="checked">
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <button class="btn bg-custome-blue-shoft rounded-pill px-3 text-white font-custome-18 fw-custome-600" data-bs-target="#addTodo" data-bs-toggle="modal" id="modalAddTodo" data-cy="todo-add-button">
                        <img src="../assets/icons/plus.svg" alt="add" width="24">
                        <span class="ms-2">Tambah</span>
                    </button>
                </div>
            </div>

            <!-- list activity -->
            <div class="col-12" v-if="data != null">
                <Detail :showLoading="isLoading" ref="ListTodo" :dataParent="data" @editData="matchFormTodo($event)" @update:Parent="updateParent()"/>
            </div>
        </div>
        
    </div>

    <!-- modal add todo -->
    <div class="modal fade" id="addTodo" tabindex="-1" aria-labelledby="addTodoLabel" aria-hidden="true" data-cy="modal-add">
        <div class="modal-dialog modal-dialog-centered modal-fullscreen-md-down">
            <div class="modal-content rounded-12 border-0">
                <div class="modal-header">
                    <h5 class="modal-title font-18 fw-custome-600 text-custome-black" data-cy="modal-add-title">Tambah List Item</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" data-cy="modal-add-close-button"></button>
                </div>
                <div class="modal-body px-0">
                    <form @submit.prevent="todo.id ? updateTodo() : addTodo()">
                        <div class="mb-3 modal-body py-0">
                            <label class="form-label font-custome-12 fw-custome-600 text-custome-black" data-cy="modal-add-name-title">NAMA LIST ITEM</label>
                            <input v-model="todo.title" type="text" class="form-control font-custome-16 fw-custome-400 text-custome-black px-3 py-3" id="inputNameItem" placeholder="Tambahkan nama list item" data-cy="modal-add-name-input" required>
                        </div>
                        <div class="mb-3 modal-body py-0">
                            <label for="property" class="form-label font-custome-12 fw-custome-600 text-custome-black" data-cy="modal-add-priority-title">PRIORITY</label>
                            <div class="dropdown">
                                <div class="d-flex position-relative col-lg-6 col-md-8 col-sm-8 input-dropdown" data-bs-toggle="dropdown" aria-expanded="false" data-cy="modal-add-priority-dropdown">
                                    <div style="width: 14px; height: 14px; transform: translatey(-50%)" :class="`rounded-circle bg-custome-${todo.color} position-absolute top-50 ms-3`"></div>
                                    <input type="text" class="form-control font-16 fw-custome-400 text-custome-black ps-5 pe-3 py-3 dropdown-toggle" :value="todo.priority_name" readonly placeholder="Pilih priority" id="property" required>
                                    <span style="transform: translatey(-50%)" class="position-absolute top-50 end-0 me-3 chevron"><img src="../assets/icons/chevron-down.svg" alt="chevron"></span>
                                </div>
                                <ul class="dropdown-menu py-0 rounded-12" style="min-width: 205px">
                                    <li>
                                        <div class="dropdown-item d-flex align-items-center justify-content-between py-3 border-bottom border-top-12" style="background-color: #E5E5E5;" >
                                            <div class="d-flex align-items-center">
                                                <span class="ms-3">Pilih priority</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li v-for="(item, i) in getPriority(null, 'option')" :key="i">
                                        <div :class="`dropdown-item d-flex align-items-center justify-content-between py-3 border-bottom ${i == getPriority(null, 'option').length - 1 ? 'border-bottom-12' : ''}`" @click="todo.priority = item.value, todo.priority_name = item.name, todo.color = item.color" :data-cy="`modal-add-priority-${item.value}`">
                                            <div class="d-flex align-items-center">
                                                <div style="width: 14px; height: 14px;" :class="`rounded-circle bg-custome-${item.color}`"></div>
                                                <span class="ms-3">{{item.name}}</span>
                                            </div>
                                            <div v-if="todo.priority_name == item.name">
                                                <img src="../assets/icons/check.svg" alt="checked">
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn bg-custome-blue-shoft rounded-pill px-3 text-white font-custome-18 fw-custome-600" type="submit" data-bs-dismiss="modal" data-cy="todo-add-button" :disabled="todo.title == null || todo.title == '' ? true : false">Simpan</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- modal information -->
    <div class="modal fade" id="updateTitleNotif" tabindex="-1" aria-labelledby="updateTitleNotifLabel" aria-hidden="true" data-cy="modal-information">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content rounded-12 border-0">
                <div class="modal-body border-0">
                    <div class="desc text-left">
                        <span class="font-14 fw-custome-500 text-custome-black">
                            <img src="../assets/icons/info.svg" class="to-red me-2">
                            {{message}}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import Detail from "../components/todo_list/Detail.vue"

    export default {
        components:{Detail},
        data(){
            return{
                isLoading: false,
                data: null,
                editTitle: false,
                todo:{
                    activity_group_id: this.$route.params.id,
                    priority: 'very-high',
                    priority_name: 'Very High',
                    color: 'red',
                    title: null,
                },
                filter: null,
                message: null,
            }
        },

        methods: {
            ...mapActions({
                getData: 'getData',
                postData: 'postData',
                updateData: 'updateData'
            }),

            async getDetail(url, params){
                try {
                    this.isLoading = true
                    let data = {url, params}
                    const response = await this.getData(data);
                    if (response.status == 200) {
                        this.isLoading = false
                        this.data = response.data
                    }
                } catch (error) {
                    console.error(error);
                }
            },

            async updateDetail(){
                try {
                    let data = {
                        url : `activity-groups/${this.$route.params.id}`, 
                        params : {title : this.data.title}
                    }
                    const response = await this.updateData(data);
                    if (response.status == 200) {
                        this.message = 'Activity berhasil diupdate'
                        
                        $('#updateTitleNotif').modal('show');
                        this.getDetail(`activity-groups/${this.$route.params.id}`)
                        
                        setTimeout(() =>{ $('#updateTitleNotif').modal('hide'), this.message = null},2000)
                    }
                } catch (error) {
                    console.error(error);
                }
            },
            
            async addTodo(){
                try {
                    this.isLoading = true

                    let data = {
                        url : 'todo-items', 
                        params : {...this.todo}
                    }
                    const response = await this.postData(data);
                    if (response.status == 201) {
                        this.getDetail(`activity-groups/${this.$route.params.id}`)
                        
                        $('#addTodo').modal('hide');
                        
                        this.message = 'Todo berhasil ditambahkan'
                        $('#updateTitleNotif').modal('show');
                        
                        this.data = null
                        
                        setTimeout(() =>{$('#updateTitleNotif').modal('hide'); this.message = null},2000)
                        
                        this.todo = {
                            activity_group_id: this.$route.params.id,
                            priority: 'very-high',
                            priority_name: 'Very High',
                            color: 'red',
                            title: null,
                        }
                    }
                } catch (error) {
                    console.error(error);
                }
            },

            async updateTodo(){
                try {
                    this.isLoading = true

                    let data = {
                        url : `todo-items/${this.todo.id}`, 
                        params : { ...this.todo }
                    }
                    const response = await this.updateData(data);
                    if (response.status == 200) {
                        this.getDetail(`activity-groups/${this.$route.params.id}`)
                        this.message = 'Todo berhasil diupdate'
                        
                        $('#updateTitleNotif').modal('show');
                        
                        this.data = null;
                        setTimeout(() =>{ $('#updateTitleNotif').modal('hide'), this.message = null},2000)

                        this.todo = {
                            activity_group_id: this.$route.params.id,
                            priority: 'very-high',
                            priority_name: 'Very High',
                            color: 'red',
                            title: null,
                        }
                    }
                } catch (error) {
                    console.error(error);
                }
            },

            matchFormTodo(data){
                this.todo.priority = data.priority
                this.todo.priority_name = this.getPriority(data.priority, null).name
                this.todo.color = this.getPriority(data.priority, null).color
                this.todo.title = data.title
                this.todo.is_active = data.is_active
                this.todo.id = data.id

                $('#addTodo').modal('show')
            },

            updateParent(){
                this.data = null
                this.message = null
                this.getDetail(`activity-groups/${this.$route.params.id}`)
            }
        },

        mounted(){
            this.getDetail(`activity-groups/${this.$route.params.id}`)
        }
    }
        
</script>