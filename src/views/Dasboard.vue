<template>
    <div class="container py-5">
        <div class="row">
            <!-- header -->
            <div class="col-12">
                <div class="d-flex justify-content-between">
                    <h1 data-cy="activity-title" class="font-custome-36 fw-custome-700">Activity</h1>
                    <button class="btn bg-custome-blue-shoft rounded-pill px-3 text-white font-custome-18 fw-custome-600" data-cy="activity-add-button">
                        <img src="../assets/icons/plus.svg" alt="add" width="24">
                        <span class="ms-2">Tambah</span>
                    </button>
                </div>
            </div>
            <!-- list activity -->
            <div class="col-12">
                <List />
            </div>
        </div>
    </div>
</template>

<script>
    import List from "../components/dashboard/List.vue"

    export default {
        components:{List},
        data(){
            return{

            }
        }
    }
</script>