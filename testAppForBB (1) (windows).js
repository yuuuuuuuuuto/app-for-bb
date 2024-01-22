/**
 * 全レコード取得
 */
(() => {
  "use strict";

  // レコード一覧画面表示イベント
  kintone.events.on("app.record.index.show", async (event) => {
    const headerSpace = kintone.app.getHeaderMenuSpaceElement();

    const myIndexButton = document.createElement("button");
    myIndexButton.id = "my_index_button";
    myIndexButton.innerText = "レコード更新";

    const detailButton = document.createElement("button");
    detailButton.type = "button";
    detailButton.className = "detailButton";
    detailButton.innerText = "詳細はこちら";

    const cssCreate = (e) => {
      const t = document.createElement("style");
      t.textContent = e;
      document.head.appendChild(t);
    };

    const count = {};
    // 達成率を計算する関数
    const AchievementRate = (num1, num2) => {
      return Math.floor((num1 / num2) * 100);
    };

    // ボタンを押した時に動く関数

    // プログレスバーを更新する
    // kintone-rest-api-client を使う準備
    const client = new KintoneRestAPIClient();
    // ↓課題提出用アプリからレコード数をカウントする。
    const eachCompleteRes = await client.record.getAllRecords({
      app: 31,
    });
    console.log(eachCompleteRes);

    //↓課題マスタ上の課題数をカウントする。
    const allTaskRes = await client.record.getAllRecords({ app: 10 });
    console.log(allTaskRes);
    console.log(allTaskRes.length);
    const taskNum = allTaskRes.length;
    // 現在開いているアプリの全課題数を取得
    // const currentAppRes = await client.record.getAllRecords({ app: 30 });
    // console.log(currentAppRes);
    // console.log(currentAppRes[0].全課題数.value);

    //↓ 重複を数えるプログラム！
    // ↓各ユーザーの課題完了数をカウントする(ユーザー名重複無し）。
    for (let i = 0; i < eachCompleteRes.length; i++) {
      let elm = eachCompleteRes[i].作成者2.value;
      count[elm] = (count[elm] || 0) + 1;
    }
    const countArrayName = [];

    for (let i = 0; i < Object.keys(count).length; i++) {
      countArrayName.push(Object.keys(count)[i]);
    }
    console.log(countArrayName);
    // console.log(currentAppRes);

    const countArrayNum = [];
    for (let i = 0; i < Object.values(count).length; i++) {
      countArrayNum.push(Object.values(count)[i]);
    }
    console.log(countArrayNum);

    for (let i = 0; i < countArrayNum.length; i++) {
      const container = document.getElementById("portal-app-link-list");
      const card = document.createElement("section");
      card.className = "card";

      // todo を作成
      const todo = document.createElement("li");
      todo.className = "todo";
      todo.textContent = countArrayName[i];

      const images = {
        1: "https://2.bp.blogspot.com/-LqQJ7v1Vt2A/Wat2LL0B1RI/AAAAAAABGVo/JSqbIiruW0sk49jV85xOUryx7do6O3MEQCLcBGAs/s800/animal_stand_tora.png",
        2: "https://3.bp.blogspot.com/-LD7eWXxJDWc/Wat2JYWIm1I/AAAAAAABGVY/QrzmfD7ayigOx65TyW0Y_UHTAKogQ_-KgCLcBGAs/s800/animal_stand_penguin.png",
        3: "https://1.bp.blogspot.com/-TyFon191pZA/Wat2HxLN5rI/AAAAAAABGVA/oWavCFgdq_gehH0H36quuyiuStYBTtJuACLcBGAs/s800/animal_stand_kuma.png",
      };

      const Array1 = Object.values(images);
      const Array2 = Object.keys(images);
      const imageNo = Math.floor(Math.random() * Object.keys(images).length);
      // localStorage.setItem(imageNo, Array1[imageNo]);

      const randomImage = document.createElement("img");
      randomImage.height = "160";
      randomImage.width = "131.4";
      // randomImage.id = "imageArea";
      if (i % Array1.length === 0) {
        randomImage.src = Array1[0];
      } else if (i % Array1.length === 1) {
        randomImage.src = Array1[1];
      } else {
        randomImage.src = Array1[2];
      }

      // let cache = localStorage.getItem(imageNo);
      // console.log(cache);

      const changePr = document.createElement("div");

      // 達成率（プログレスバー）を作成
      const achievement = document.createElement("progress");
      achievement.id = "achievement";
      achievement.value = AchievementRate(countArrayNum[i], taskNum);
      achievement.max = 100;
      // achievement.textContent = res[i].達成率.value;

      // document.getElementById("my_index_button").disabled = true;
      // val2 =  Number(res[i].達成率.value);
      // console.log(val2);

      // arrChangeCnt.push((intervalID = setInterval(updateProgress, 30)));

      const achievementNum = document.createElement("div");
      achievementNum.id = "achievementNum";
      // achievementNum.textContent = val + "%";
      achievementNum.textContent = `${countArrayNum[i]}/${taskNum}  完了`;

      cssCreate(
        `.card{border-radius: 5px; box-shadow:0 2px 5px #ccc; width:208px; height:270px; text-align:center}`
      );
      cssCreate(`.detailButton{
        border-radius: 100px;
        width: 180px;
        padding: 12px;
        box-sizing: border-box;
        background: #6fa1ff;
        color: #FFF;
        text-decoration: none;
        border: none;
        text-align: center;
        margin: 8px 0;}`);
      // todo を card の中に追加する
      card.append(todo);

      // randomImage.append(localStorage.getItem(imageNo));

      card.append(randomImage);

      card.append(changePr);

      //achievement
      card.append(achievement);
      // card.append(changePr);

      card.append(achievementNum);

      // card を container の中に追加する
      container.append(card);
    }

    // let val2;
    // let val = 0;
    // let intervalID;
    // const updateProgress = () => {
    //   //   // プログレスバーの進捗値を更新し、プログレスバーに反映させる

    //   val += 1;
    //   document.getElementById("myProgress").value = val;
    //   document.getElementById("a").textContent = val + "%";
    //   console.log("progress:", val, "%");

    //   // 最大値まで達したら終了
    //   if (val2 == val) {
    //     clearInterval(intervalID);
    //     document.getElementById("my_index_button").disabled = false;
    //   }
    // };
    // メニューの右側の空白部分にボタンを設置

    headerSpace.appendChild(detailButton);
    detailButton.onclick = () => {
      const url = "https://yuto0925.cybozu.com/k/30/";
      window.open(url, "_blank");
    };

    // headerSpace.appendChild(myIndexButton);
    // myIndexButton.onclick = () => {

    //改めて取得した全課題数とこのアプリに表示されている全課題数が異なる場合、改めて取得した方の値に書き換える。
    // for (let i = 0; i < currentAppRes.length; i++) {
    //   if (currentAppRes[i].全課題数.value !== taskNum) {
    //     let recordId = currentAppRes[i].レコード番号.value;
    //     let completedRate = AchievementRate(
    //       currentAppRes[i].課題完了数.value,
    //       taskNum
    //     );
    //     const body = {
    //       app: 30,
    //       id: recordId,
    //       record: {
    //         全課題数: {
    //           value: taskNum,
    //         },
    //         達成率: {
    //           value: completedRate,
    //         },
    //       },
    //     };
    //     await kintone.api(
    //       kintone.api.url("/k/v1/record.json", true),
    //       "PUT",
    //       body
    //     );
    //   }
    //   // console.log(document.getElementById("a"));
    //   // document.getElementById("a").textContent = taskNum;
    // }

    // ボタンを無効にする(何回も押せないように)
    // document.getElementById("my_index_button").disabled = true;
    // 50msおきにプログレスバーを更新する
    // val2 = 65;
    // intervalID = setInterval(updateProgress, 30);

    // for (let i = 0; i < countArrayNum.length; i++) {
    //   const container = document.getElementById("portal-app-link-list");
    //   const card = document.createElement("section");
    //   card.className = "card";

    //   // todo を作成
    //   const todo = document.createElement("li");
    //   todo.className = "todo";
    //   todo.textContent = countArrayName[i];

    //   // 達成率（プログレスバー）を作成
    //   const achievement = document.createElement("progress");
    //   achievement.id = "achievement";
    //   achievement.value = AchievementRate(countArrayNum[i], taskNum);
    //   achievement.max = 100;
    // achievement.textContent = res[i].達成率.value;

    // document.getElementById("my_index_button").disabled = true;
    // val2 =  Number(res[i].達成率.value);
    // console.log(val2);

    // arrChangeCnt.push((intervalID = setInterval(updateProgress, 30)));

    //   const achievementNum = document.createElement("div");
    //   achievementNum.id = "achievementNum";
    //   // achievementNum.textContent = val + "%";
    //   achievementNum.textContent =
    //     AchievementRate(countArrayNum[i], taskNum) + "%";

    //   // todo を card の中に追加する
    //   card.append(todo);

    //   //achievement
    //   card.append(achievement);

    //   card.append(achievementNum);

    //   // card を container の中に追加する
    //   container.append(card);
    // }
    //         for (let i_two = 0; i_two < countArrayName.length; i_two++) {
    //           console.log(i_two);
    //           if (currentAppRes[i].学習者名.value === countArrayName[i_two]) {
    //             if (currentAppRes[i].課題完了数.value !== countArrayNum[i_two]) {
    //               let recordId = currentAppRes[i].レコード番号.value;
    //               let completedRate = AchievementRate(
    //                 countArrayNum[i_two],
    //                 taskNum
    //               );
    //               const body = {
    //                 app: 30,
    //                 id: recordId,
    //                 record: {
    //                   課題完了数: {
    //                     value: countArrayNum[i_two],
    //                   },
    //                   達成率: {
    //                     value: completedRate,
    //                   },
    //                 },
    //               };
    //               await kintone.api(
    //                 kintone.api.url("/k/v1/record.json", true),
    //                 "PUT",
    //                 body
    //               );
    //             }
    //           }
    //         }

    //       const arrayLearnerName = [];
    //       for (let i = 0; i < currentAppRes.length; i++) {
    //         arrayLearnerName.push(currentAppRes[i].学習者名.value);
    //       }
    //       console.log(arrayLearnerName);
    //       for (let i = 0; i < countArrayName.length; i++) {
    //         if (arrayLearnerName.includes(countArrayName[i]) === false) {
    //           let newRecordLearnerName = countArrayName[i];
    //           console.log("要レコード追加");
    //           console.log(newRecordLearnerName);
    //           console.log(count.newRecordLearnerName);
    //           let completedRate = AchievementRate(countArrayNum[i], taskNum);
    //           const body = {
    //             app: kintone.app.getId(),
    //             record: {
    //               学習者名: {
    //                 value: newRecordLearnerName,
    //               },
    //               課題完了数: {
    //                 value: countArrayNum[i],
    //               },
    //               全課題数: {
    //                 value: taskNum,
    //               },
    //               達成率: {
    //                 value: completedRate,
    //               },
    //             },
    //           };

    //           await kintone.api(
    //             kintone.api.url("/k/v1/record.json", true),
    //             "POST",
    //             body
    //           );
    //         }
    //       }
    //   location.reload();
    // };
    return event;
  });
})();
