/**
 * たまや (tamaya) - 動作確認用モックデータ (50件)
 */

(() => {
    const mockData = [
        { name: 'さくら', comment: '合格おめでとう！春から新生活がんばってね！', color: '#ff6b81' },
        { name: 'けんた', comment: 'いつも支えてくれてありがとう。これからもよろしく！', color: '#1e90ff' },
        { name: 'ひまり', comment: 'お誕生日おめでとう！素敵な1年になりますように。', color: '#ffd700' },
        { name: 'たくみ', comment: 'プロジェクト公開おめでとうございます！', color: '#2ed573' },
        { name: 'あおい', comment: 'たまやーーー！綺麗な花火が上がりますように！', color: '#ff4757' },
        { name: 'りくと', comment: '部活の大会、全力で応援してるぞ！', color: '#ffa502' },
        { name: 'ゆい', comment: 'いつも美味しいご飯を作ってくれて感謝です。', color: '#eccc68' },
        { name: 'しょうた', comment: '世界が平和でありますように。', color: '#9b59b6' },
        { name: 'めい', comment: 'みんなの想いが夜空に届きますように。', color: '#ff6b81' },
        { name: 'はると', comment: '第一志望合格！絶対にやってみせる！', color: '#1e90ff' },
        { name: 'こはる', comment: 'おじいちゃん、おばあちゃん、いつまでも長生きしてね。', color: '#ffd700' },
        { name: 'ゆうと', comment: '今日もお仕事お疲れ様でした！', color: '#2ed573' },
        { name: 'みお', comment: '新しい挑戦、心から応援しています。', color: '#ff4757' },
        { name: 'そうた', comment: '宝くじが当たりますように！', color: '#ffa502' },
        { name: 'ななみ', comment: '久しぶりにみんなで集まれて楽しかったね！', color: '#eccc68' },
        { name: 'だいき', comment: 'いつもチームを引っ張ってくれてありがとう。', color: '#9b59b6' },
        { name: 'ゆうな', comment: '新しい家族の誕生をお祝いします！おめでとう！', color: '#ff6b81' },
        { name: 'こうき', comment: '夏休みが終わらないでほしい。', color: '#1e90ff' },
        { name: 'るな', comment: '笑顔あふれる毎日になりますように。', color: '#ffd700' },
        { name: 'れん', comment: '今度のテストで満点取るぞ！', color: '#2ed573' },
        { name: 'あかり', comment: 'いつも優しくしてくれて本当にありがとう。', color: '#ff4757' },
        { name: 'はやと', comment: 'たまやの開発、応援しています！', color: '#ffa502' },
        { name: 'ちひろ', comment: '健康第一！毎日を大切に過ごそう。', color: '#eccc68' },
        { name: 'りゅう', comment: '大輪の金色花火、打ち上がれ！', color: '#ffd700' },
        { name: 'さな', comment: '夢に向かって一歩ずつ進んでいきます。', color: '#9b59b6' },
        { name: 'かいと', comment: 'いつもおもしろい話をありがとう！', color: '#1e90ff' },
        { name: 'ひな', comment: 'また一緒に旅行に行こうね！', color: '#ff6b81' },
        { name: 'たいが', comment: 'ライブ大成功おめでとう！最高だったよ！', color: '#ff4757' },
        { name: 'みさき', comment: 'いつも相談に乗ってくれて感謝してるよ。', color: '#ffa502' },
        { name: 'まなと', comment: '美味しいものたくさん食べるぞー！', color: '#eccc68' },
        { name: 'ゆあ', comment: 'みんなでつなぐリレー、素敵ですね。', color: '#2ed573' },
        { name: 'けいすけ', comment: '次のステップに進む君を応援している。', color: '#9b59b6' },
        { name: 'りお', comment: 'これからもたくさんの思い出を作ろうね。', color: '#ff6b81' },
        { name: 'ゆうき', comment: '最高の夜空になりますように！', color: '#ffd700' },
        { name: 'つむぎ', comment: '新しい趣味を見つけて毎日が楽しいです。', color: '#1e90ff' },
        { name: 'あさひ', comment: 'いつも支えてくれる仲間に大感謝！', color: '#2ed573' },
        { name: 'いちか', comment: 'ピアノの発表会、緊張するけど頑張る！', color: '#ff4757' },
        { name: 'かなた', comment: 'たまや〜〜〜〜！ドカンと一発！', color: '#ffa502' },
        { name: 'にいな', comment: 'みんな健康で元気に過ごせますように。', color: '#eccc68' },
        { name: 'しおん', comment: '大好きなアニメの続編が楽しみすぎる！', color: '#9b59b6' },
        { name: 'あんず', comment: 'いつも笑顔をありがとう。', color: '#ff6b81' },
        { name: 'こうへい', comment: '仕事の目標、今期も絶対に達成する！', color: '#1e90ff' },
        { name: 'ほのか', comment: '猫との暮らしに癒される毎日です。', color: '#ffd700' },
        { name: 'りょうた', comment: '次の週末のキャンプが待ち遠しい！', color: '#2ed573' },
        { name: 'ひより', comment: 'いつか宇宙旅行に行けますように。', color: '#ff4757' },
        { name: 'まさき', comment: 'みんなの個性が夜空で輝く！', color: '#ffa502' },
        { name: 'かほ', comment: '楽しいおしゃべりの時間をありがとう。', color: '#eccc68' },
        { name: 'あらた', comment: '自分のペースで焦らず進もう。', color: '#9b59b6' },
        { name: 'ゆづき', comment: '最高の仲間に出会えて幸せです！', color: '#ff6b81' },
        { name: 'えいと', comment: 'たまやのプロダクトの完成を楽しみにしています。', color: '#1e90ff' }
    ];

    // グローバルオブジェクトに設定
    window.MOCK_FIREWORKS_DATA = mockData;
})();
