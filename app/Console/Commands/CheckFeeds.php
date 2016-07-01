<?php

namespace App\Console\Commands;

use App\Article;
use Illuminate\Console\Command;
use App\Http\Controllers\FeedController;
use App\Http\Controllers\SocketController;
use Illuminate\Support\Facades\Cache;

class CheckFeeds extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'feeds:check';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Checks feeds in the feeds table and adds new articles.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        //$time_start = microtime(true);
        //$urls = \App\Feed::where('id', '=', 4)->get();
        $urls = \App\Feed::all();
        $newArticles = false;
        $newFeedIds = [];

        foreach($urls as $url) {
            $feed = new FeedController();

            $feeds = $feed->getFeed($url->feed_url);

            //echo 'before--------';
            if(Cache::get($url->feed_url) !== $feeds) {
                Cache::put($url->feed_url, $feeds, 60);

                //echo 'cache different';

                $newArticleIds = [];
                foreach ($feeds as $feed) {
                    if (!Article::where('article_title', '=', $feed['title'])->count() > 0) {
                        $article = new Article();
                        $article->article_description = $feed['des'];
                        $article->article_title = $feed['title'];
                        $article->article_img = $feed['thumb'];
                        $article->article_link = $feed['link'];
                        $article->feed_id = $url->id;
                        $article->save();
                        $newArticleIds[] = $article->id;
                        $newArticles = true;
                    }
                }
                if (count($newArticleIds) > 0) $newFeedIds[] = [$url->id => $newArticleIds];
            }
        }
        if($newArticles) SocketController::pingSocketIO($newFeedIds);
        //$time_end = microtime(true);
        //$execution_time = ($time_end - $time_start);
        //echo $execution_time;
    }
}
