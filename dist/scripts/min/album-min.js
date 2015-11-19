var setSong=function(e){currentSoundFile&&currentSoundFile.stop(),currentlyPlayingSongNumber=parseInt(e),currentSongFromAlbum=currentAlbum.songs[e-1],currentSoundFile=new buzz.sound(currentSongFromAlbum.audioUrl,{formats:["mp3"],preload:!0});var n=function(e){currentSoundFile&&currentSoundFile.setTime(e)},t=function(e){currentSoundFile&&currentSoundFile.setVolume(e)};n(),t(currentVolume),currentSoundFile.play()},getSongNumberCell=function(e){return $('.song-item-number[data-song-number="'+e+'"]')},createSongRow=function(e,n,t){var r='<tr class="album-view-song-item">  <td class="song-item-number" data-song-number="'+e+'">'+e+'</td>  <td class="song-item-title">'+n+'</td>  <td class="song-item-duration">'+t+"</td></tr>",u=$(r),a=function(){var e=$(this).find(".song-item-number"),n=e.attr("data-song-number"),t=function(){var e=$(".player-bar h2");e.eq(0).html(currentAlbum.artist+" – "+currentSongFromAlbum.name),e.eq(1).html(currentSongFromAlbum.name),e.eq(2).html(currentAlbum.artist),$(".main-controls .play-pause").html(playerBarPauseButton)};if(null===currentlyPlayingSongNumber)e.html(pauseButtonTemplate),setSong(n),t();else if(currentlyPlayingSongNumber===parseInt(n))e.html(playButtonTemplate),currentSoundFile.isPaused()?currentSoundFile.play():currentSoundFile.pause(),$(".main-controls .play-pause").html(playerBarPlayButton);else if(currentlyPlayingSongNumber!==parseInt(n)){e.html(pauseButtonTemplate);var r=$('[data-song-number="'+currentlyPlayingSongNumber+'"]');r.html(currentlyPlayingSongNumber),setSong(n),t()}updateSeekBarWhileSongPlays()},l=function(){var e=$(this).find(".song-item-number"),n=parseInt(e.attr("data-song-number"));n!==currentlyPlayingSongNumber&&e.html(playButtonTemplate)},o=function(){var e=$(this).find(".song-item-number"),n=parseInt(e.attr("data-song-number"));n!==currentlyPlayingSongNumber&&e.html(n)};return u.click(a),u.hover(l,o),u},setCurrentAlbum=function(e){currentAlbum=e;var n=$(".album-view-title"),t=$(".album-view-artist"),r=$(".album-view-release-info"),u=$(".album-cover-art"),a=$(".album-view-song-list");n.text(e.name),t.text(e.artist),r.text(e.year),u.attr("src",e.albumArtUrl),a.empty();for(var l=0;l<e.songs.length;l++){var o=createSongRow(l+1,e.songs[l].name,e.songs[l].length);a.append(o)}},updateSeekBarWhileSongPlays=function(){currentSoundFile&&currentSoundFile.bind("timeupdate",function(e){var n=this.getTime()/this.getDuration(),t=$(".seek-control .seek-bar");updateSeekPercentage(t,n)})},updateSeekPercentage=function(e,n){var t=100*n;t=Math.max(0,t),t=Math.min(100,t);var r=t+"%";e.find(".fill").width(r),e.find(".thumb").css({left:r})},setupSeekBars=function(){var e=$(".player-bar .seek-bar");e.click(function(e){var n=e.pageX-$(this).offset().left,t=$(this).width(),r=n/t;updateSeekPercentage($(this),r),seek()}),e.find(".thumb").mousedown(function(e){var n=$(this).parent();$(document).bind("mousemove.thumb",function(e){var t=e.pageX-n.offset().left,r=n.width(),u=t/r;updateSeekPercentage(n,u)}),$(document).bind("mouseup.thumb",function(){$(document).unbind("mousemove.thumb"),$(document).unbind("mouseup.thumb")})})},trackIndex=function(e,n){return e.songs.indexOf(n)},nextSong=function(){if(null!==currentSongFromAlbum){var e=function(e){return 0===e?currentAlbum.songs.length:e},n=trackIndex(currentAlbum,currentSongFromAlbum);n++,console.log(n),n>=currentAlbum.songs.length&&(n=0),setSong(n+1),updateSeekBarWhileSongPlays(),$(".currently-playing .song-name").text(currentSongFromAlbum.name),$(".currently-playing .artist-name").text(currentAlbum.artist),$(".currently-playing .artist-song-mobile").text(currentAlbum.artist+" - "+currentSongFromAlbum.name),$(".main-controls .play-pause").html(playerBarPauseButton);var t=e(n),r=getSongNumberCell(currentlyPlayingSongNumber),u=getSongNumberCell(t);r.html(pauseButtonTemplate),u.html(t)}},previousSong=function(){if(null!==currentlyPlayingSongNumber){var e=function(e){return e===currentAlbum.songs.length-1?1:e+2},n=trackIndex(currentAlbum,currentSongFromAlbum);console.log(n),n--,0>n&&(n=currentAlbum.songs.length-1),setSong(n+1),updateSeekBarWhileSongPlays(),$(".currently-playing .song-name").text(currentSongFromAlbum.name),$(".currently-playing .artist-name").text(currentAlbum.artist),$(".currently-playing .artist-song-mobile").text(currentAlbum.artist+" - "+currentSongFromAlbum.name),$(".main-controls .play-pause").html(playerBarPauseButton);var t=e(n),r=getSongNumberCell(currentlyPlayingSongNumber),u=getSongNumberCell(t);r.html(pauseButtonTemplate),u.html(t)}},togglePlayFromPlayerBar=function(){currentSoundFile.isPaused()?(currentSoundFile.play(),$playPause.html(playerBarPauseButton),getSongNumberCell(currentlyPlayingSongNumber).html(pauseButtonTemplate)):(currentSoundFile.pause(),$playPause.html(playerBarPlayButton),getSongNumberCell(currentlyPlayingSongNumber).html(playButtonTemplate))},playButtonTemplate='<a class="album-song-button"><span class="ion-play"></span></a>',pauseButtonTemplate='<a class="album-song-button"><span class="ion-pause"></span></a>',playerBarPlayButton='<span class="ion-play"><span>',playerBarPauseButton='<span class="ion-pause"><span>',currentAlbum=null,currentlyPlayingSongNumber=null,currentSongFromAlbum=null,currentSoundFile=null,currentVolume=100,$previousButton=$(".main-controls .previous"),$nextButton=$(".main-controls .next"),$playPause=$(".main-controls .play-pause");$(document).ready(function(){setCurrentAlbum(albumPicasso),$previousButton.click(previousSong),$nextButton.click(nextSong),$playPause.click(togglePlayFromPlayerBar),setupSeekBars()});