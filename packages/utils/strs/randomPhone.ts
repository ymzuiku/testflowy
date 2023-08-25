export function randomPhone() {
  let phone = "1";
  phone += Math.floor(Math.random() * 10);
  for (let i = 0; i < 9; i++) {
    phone += Math.floor(Math.random() * 10);
  }
  return phone;
}
