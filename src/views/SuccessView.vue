<template>
  <div class="success frame-paper">
    <h1>{{ $t("congrats") }}</h1>
    <p>{{ $t("success") }}</p>
  </div>
</template>

<style>
.success {
  padding: 1.5rem;
  aspect-ratio: 1 / 1;
  display: grid;
  place-content: center;
  place-items: center;
  font-family: "Josefin Sans", sans-serif;
  position: relative;
  overflow: hidden;
}

.success h1, .success p {
  font-weight: 200;
  font-size: 2rem;
  z-index: 1;
}

.success::before {
  content: "";
  border: 1px solid #ebebeb;
  transform: translateY(-70%) rotate(45deg);
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.success::after {
  content: "";
  background-image: url("@/assets/stamp.svg");
  background-repeat: no-repeat;
  background-position: top right;
  display: block;
  width: 100%;
  min-height: 100%;
  position: absolute;
  top: 0;
  right: 0;
}

</style>
