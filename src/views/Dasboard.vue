<template>
    <div class="container py-5">
        <div class="row">
            <!-- header -->
            <div class="col-12">
                <div class="d-flex justify-content-between">
                    <h1 data-cy="activity-title" class="font-custome-36 fw-custome-700">Activity</h1>
                    <button class="btn bg-custome-blue-shoft rounded-pill px-3 text-white font-custome-18 fw-custome-600" @click="postActivity('activity-groups', {'title': 'New Activity'})" data-cy="activity-add-button">
                        <img src="../assets/icons/plus.svg" alt="add" width="24">
                        <span class="ms-2">Tambah</span>
                    </button>
                </div>
            </div>
            <!-- list activity -->
            <div class="col-12">
                <Detail :showLoading="isLoading" ref="ListTodo"/>
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
            }
        },

        methods: {
            ...mapActions({
                postData: 'postData'
            }),
    
            async postActivity(url, params){
                this.isLoading = true

                let data = {url, params}
                const response = await this.postData(data)
                this.$refs.ListActivity.deleteAction = false

                if (response.status == 201) {
                    // child modal
                    $('#deleteActivityNotif').modal('show')
                    this.$refs.ListActivity.getActivity('activity-groups')
                    setTimeout( ()=>{$('#deleteActivityNotif').modal('hide')}, 2000)
                }
            }
        },
    }
        
</script>