module.exports = {
  rules: [{
    pattern: /\/api\/homeList.php$/,
    respondwith: './home.json'
  },{
    pattern: /\/api\/homeList.php\?type=more$/,
    respondwith: './home.more.json'
  },{
    pattern: /\/api\/ganDanList.php$/,
    respondwith: './ganDan.json'
  },{
    pattern: /\/api\/ganDanList.php\?type=more$/,
    respondwith: './ganDan.more.json'
  },{
    pattern: /\/api\/ganDanList.php\?type=reflesh$/,
    respondwith: './ganDan.reflesh.json'
  },
    {
      pattern: /\/api\/homeList.php\?type=refresh$/,
      respondwith: './home.more2.json'
    }

  ]
};
