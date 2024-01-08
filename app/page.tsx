import Image from "next/image";
import { FC } from "react";
import HeroImage from "@/public/logo/mobazy-top.svg";

const Home: FC = () => {
  return (
    <div className="flex top-0 z-0 shrink-0 min-h-screen w-full flex-col items-center justify-center gap-9 bg-grid-slate-200">
      <span className="w-full  h-7 bg-green-400 blur-xl" />
      <article className="flex max-w-3xl flex-col gap-4 p-6 mb-12">
        <Image
          src={HeroImage}
          priority
          // placeholder="blur"
          className="relative w-3/4 md:w-1/2 mx-auto object-cover"
          alt="Mobazyのロゴ"
        />
        <h1 className="my-6 text-center sm:text-2xl leading-normal lg:text-3xl">
          <span className="text-2xl font-bold">
            &quot;いつでもどこでも気軽にバッテリーを借りよう！&quot;
          </span>
        </h1>
        <section className="flex flex-col gap-1">
          <p>
            Mobazyは、&quot;いつでもどこでも気軽に、バッテリーを借りる&quot;
            ことを目的としたモバイルバッテリーの貸し出しサービスです。
            この専用ウェブサイトから以下の機能を提供しています。
          </p>
          <ul className="my-4 mx-auto italic">
            <li>
              ✅あなたのお近くのステーションの場所をGoogleマップで案内できる
            </li>
            <li>
              ✅あるステーションでの利用可能なバッテリーの個数をリアルタイムで表示できる
            </li>
            <li>✅動的なワンタイムパスコードによる安全な貸出、返却ができる</li>
            <li>
              ✅webアプリケーションから、ご利用時間と返却期限など貸し出し状況を確認できる
            </li>
            <li>✅ユーザの返却期限が過ぎていることを通知できる</li>
          </ul>
          <p>
            バッテリー管理ウェブアプリによって、いつでもどこでもスムーズにバッテリーを借りることが可能です。
            スマホやタブレットの充電を忘れてしまった日や長時間使用する日でも、充電切れする心配はありません。
          </p>
          <hr className="my-4 h-px w-full border-slate-900" />
          <h2 className="text-center text-xl font-bold mb-2">ご利用条件</h2>
          <div className="flex justify-center italic gap-10 mb-2">
            <span>🔋バッテリー: USB-A出力, 2500mAh</span>
            <span>⏰返却期限: 48時間以内</span>
            <span>👦利用台数: 1人同時に一台まで</span>
          </div>
          <p>
            残念ながら技術的な問題で、USB-A出力のバッテリーしか用意できていません。
            また、ケーブルをバッテリーに収納できなかったため、USB-Aと充電したい端末の端子を繋ぐ
            ケーブルを用意する必要があります。
          </p>
          <hr className="my-4 h-px w-full border-slate-900" />
          <h2 className="text-center text-xl font-bold mb-2">
            実現されたアイデア
          </h2>
          <ul className="mx-auto italic">
            <li>
              💡ステーションではマグネット式の充電ケーブルを使用し、バッテリーを正しい向きで差し入れるだけで返却が行えます。
            </li>
            <li>
              💡バッテリーに流れる電流を測定することで「充電されているか」を、また、3ピンスイッチで「バッテリーがポートにあるか」を判断し、利用できるバッテリーの個数を算出しています。
            </li>
            <li>
              💡家庭用のコンセントからステーションに給電し、電気専攻の班員が制作した充電回路でバッテリーに給電を行っています。
            </li>
          </ul>
          <ul />
        </section>
      </article>
    </div>
  );
};

export default Home;
