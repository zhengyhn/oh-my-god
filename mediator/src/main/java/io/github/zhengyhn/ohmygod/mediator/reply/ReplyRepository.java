package io.github.zhengyhn.ohmygod.mediator.reply;

import io.github.zhengyhn.ohmygod.mediator.reply.entity.Reply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ReplyRepository extends JpaRepository<Reply, Long> {
    @Transactional(propagation = Propagation.REQUIRED)
    @Modifying
    @Query("UPDATE Reply SET status = :status WHERE id IN :ids")
    int updateStatusByIds(@Param("ids") List<Long> ids, @Param("status") String status);

    @Query("SELECT reply FROM Reply reply WHERE id IN :ids")
    List<Reply> findAllByIds(@Param("ids") List<Long> ids);

    boolean existsByUrl(String url);

    boolean existsByUrlAndAuthor(String url, String author);
}
