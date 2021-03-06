    var coef = [0.95, 0.96, 0.97, 0.98, 0.99, 1.0, 1.01, 1.02, 1.03, 1.04];
    function is_valid_damage(damage, base_damage){
      for (var i=0; i<coef.length; i++) {
        if (Math.abs(coef[i]*base_damage - damage) < 5){
          return true;
        }
      }
      return false;
    }
    function is_valid_base_damage(damage_list, base_damage){
      for (var i=0; i<damage_list.length; i++){
        if (!is_valid_damage(damage_list[i], base_damage)){
          return false;
        }
      }
      return true;
    }
    function find_base_damage(damage_list){
      var damage_list_sorted = damage_list.sort(function(a,b) { return a - b;});
      for (var i=0; i<coef.length; i++) {
        var base_damage = damage_list_sorted[0]/coef[i];
        if (is_valid_base_damage(damage_list_sorted, base_damage)){
          return base_damage;
        }
      }
      return 0;
    }
    function clear_input() {
      document.getElementById("damage1").value = 0;
      document.getElementById("damage2").value = 0;
      document.getElementById("damage3").value = 0;    
    }
    function modify_table() {
      var tbl = document.getElementById("dmgTable");
      var damage1 = document.getElementById("damage1").value;
      var damage2 = document.getElementById("damage2").value;
      var damage3 = document.getElementById("damage3").value;
      var base_damage = find_base_damage([damage1, damage2, damage3]);
      for (var i=0; i<coef.length; i++) {
        if (base_damage!=0) {
          tbl.rows[i%5+1].cells[Math.floor(i/5)*2+1].innerHTML = Math.round(base_damage*coef[i]);
        }
        else {
          tbl.rows[i%5+1].cells[Math.floor(i/5)*2+1].innerHTML = 'N/A';
        }
      }
    }
