<script setup>
   
</script>

<template>
  <div class="container bg-white py-5">
    <div class="row align-items-start">
      <!-- 左側標題 -->
      <div class="col-lg-7 mb-4">
        <h2 class="mb-3">歡迎加入 DaliyQuest!</h2>
        <p class="lead">紀錄生活，每日成長</p>
        <p>請填寫註冊會員表格，開始追蹤你的努力，讓每一步都算數</p>
      </div>

      <!-- 右側表單 -->
      <div class="col-lg-5">
        <div class="card border-0 shadow-sm p-4"> <!-- 隱形邊框 + 陰影 -->
          <h3 class="form-title mb-4">Reigister</h3>
          <form>
            <div class="form-group mb-3">
              <label for="destination">Destination</label>
              <select name="destination" id="destination" class="form-select" required>
                <option value="">Choose your destination</option>
                <option value="europe">Europe</option>
                <option value="asia">Asia</option>
                <option value="america">America</option>
                <option value="africa">Africa</option>
                <option value="oceania">Oceania</option>
              </select>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group mb-3">
                  <label for="checkin">Departure Date</label>
                  <input type="date" name="checkin" id="checkin" class="form-control" required>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-3">
                  <label for="checkout">Return Date</label>
                  <input type="date" name="checkout" id="checkout" class="form-control" required>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group mb-3">
                  <label for="adults">Adults</label>
                  <select name="adults" id="adults" class="form-select" required>
                    <option value="1">1 Adult</option>
                    <option value="2">2 Adults</option>
                    <option value="3">3 Adults</option>
                    <option value="4">4+ Adults</option>
                  </select>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-3">
                  <label for="children">Children</label>
                  <select name="children" id="children" class="form-select">
                    <option value="0">No Children</option>
                    <option value="1">1 Child</option>
                    <option value="2">2 Children</option>
                    <option value="3">3+ Children</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="form-group mb-4">
              <label for="tour-type">Tour Type</label>
              <select name="tour_type" id="tour-type" class="form-select" required>
                <option value="">Select tour type</option>
                <option value="adventure">Adventure</option>
                <option value="cultural">Cultural</option>
                <option value="relaxation">Relaxation</option>
                <option value="family">Family</option>
                <option value="luxury">Luxury</option>
              </select>
            </div>

            <button type="submit" class="btn btn-primary w-100">Find Your Perfect Trip</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>

</style>